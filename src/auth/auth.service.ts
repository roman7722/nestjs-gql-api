import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MessageCodeError } from '../common/lib/error/MessageCodeError';
import { CreateRefreshTokenInput } from '../token/inputs/token.create.inputs';
import { UpdateRefreshTokenInput } from '../token/inputs/token.update.inputs';
import Token from '../token/token.model';
import { TokenService } from '../token/token.service';
import { IPayload, ITokens, TDecodedToken } from '../token/token.types';
import { UserService } from '../user/user.service';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
  ) {}

  /**
   * Generation accessToken, refreshToken and expiresIn
   * @param payload {IPayload}
   * @returns {Tokens}
   */
  private getTokens(payload: IPayload): ITokens {
    // Generation accessToken
    const accessToken: string = this.jwtService.sign(
      { ...payload, isAccessToken: 1 },
      {
        expiresIn: jwtConstants.accessTokenLife,
        algorithm: 'HS256',
      },
    );
    // Generation refreshToken
    const refreshToken: string = this.jwtService.sign(
      { ...payload, isAccessToken: 0 },
      {
        expiresIn: jwtConstants.refreshTokenLife,
        algorithm: 'HS256',
      },
    );

    // Get data from accessToken
    const decodedAccessToken: TDecodedToken = this.jwtService.decode(
      accessToken,
    ) as TDecodedToken;

    // Getting a expires time accessToken (Unix timestamp)
    let expiresIn: number = 0;
    if (typeof decodedAccessToken !== 'string' && decodedAccessToken?.exp) {
      expiresIn = decodedAccessToken.exp;
    }

    return {
      accessToken,
      refreshToken,
      expiresIn,
    };
  }

  static async comparePassword(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash);
  }

  /**
   * User Authentication, generation accessToken, refreshToken and expiresIn
   * @param username {string}
   * @param password {string}
   * @param fingerprint {string}
   * @returns {Tokens}
   */
  async validateUser(
    username: string,
    password: string,
    fingerprint: string,
  ): Promise<ITokens | undefined> {
    // Search for user in s_user table by username
    const user = await this.userService.findUser(username);

    if (user && user.passwordHash) {
      // Getting passwordHash from a record of a found user
      const { passwordHash } = user;

      const isMatch: boolean = await AuthService.comparePassword(
        password,
        passwordHash,
      );

      if (!isMatch) {
        // Passwords did not match
        // throw new UnauthorizedException('auth:login:badUsernameOrPassword');
        throw new MessageCodeError('auth:login:badUsernameOrPassword');
      } else {
        // passwords match
        const userId: number = user.id;
        const payload = { username, sub: userId };

        // Get the number of user refreshToken entries
        const numberRefreshTokens: number = await this.tokenService.numberRefreshTokens(
          userId,
        );

        // If the refreshToken is greater than the maximum maxNumberRefreshTokens,
        // then delete all refreshToken user from the table
        if (numberRefreshTokens >= jwtConstants.maxNumberRefreshTokens) {
          await this.tokenService.deleteAllRefreshToken(userId);
        }

        // Generation accessToken, refreshToken and expiresIn
        const tokens = this.getTokens(payload);

        // Search for an entry in the session table of an existing userId and fingerprint
        const existingRefreshTokenRow: Token = await this.tokenService.findRefreshToken(
          userId,
          fingerprint,
        );

        // Retrieving data from refreshToken
        const decodedRefreshToken: TDecodedToken = this.jwtService.decode(
          tokens.refreshToken,
        ) as TDecodedToken;

        // Check for existence decodedRefreshToken.exp refreshToken lifetime
        if (
          typeof decodedRefreshToken !== 'string' &&
          decodedRefreshToken?.exp
        ) {
          if (existingRefreshTokenRow) {
            const value: UpdateRefreshTokenInput = {
              id: existingRefreshTokenRow.id,
              userId,
              refreshToken: tokens.refreshToken,
              expiresIn: decodedRefreshToken.exp,
              fingerprint,
            };
            await this.tokenService.updateRefreshToken(value);
          } else {
            const data: CreateRefreshTokenInput = {
              userId,
              refreshToken: tokens.refreshToken,
              expiresIn: decodedRefreshToken.exp,
              fingerprint,
            };
            await this.tokenService.createRefreshToken(data);
          }

          return tokens;
        }
      }
    } else {
      throw new MessageCodeError('auth:login:badUsernameOrPassword');
    }
    throw new UnauthorizedException('Unauthorized3');
  }

  /**
   * Update accessToken, refreshToken and expiresIn
   * @param refreshToken {string}
   * @param fingerprint {string}
   * @returns {Tokens}
   */
  async regenerateRefreshToken(
    refreshToken: string,
    fingerprint: string,
  ): Promise<ITokens | undefined> {
    // Search in table of session record where refreshToken matches fingerprint
    const existingRefreshTokenRow = await this.tokenService.verifyRefreshToken(
      refreshToken,
      fingerprint,
    );

    let userId: number = 0;
    let expiresIn: number = 0;
    let recordId: number = 0;
    let username: string = '';

    if (existingRefreshTokenRow?.userId) {
      const { getDataValue } = existingRefreshTokenRow;
      userId = getDataValue('userId');
      expiresIn = getDataValue('expiresIn');
      recordId = getDataValue('id');

      // Getting data from a new refreshToken
      const decodedRefreshToken: TDecodedToken = this.jwtService.decode(
        refreshToken,
      ) as TDecodedToken;

      // If the received refreshToken was decoded without errors
      if (
        typeof decodedRefreshToken !== 'string' &&
        decodedRefreshToken?.username
      ) {
        username = decodedRefreshToken.username;
      }
    } else {
      // If the record is not found, throw an Unauthorized exception
      throw new UnauthorizedException('Unauthorized');
    }

    // Get the current Unix timestamp in seconds
    const currentTimestamp: number = +Math.round(+new Date() / 1000);

    // If refreshToken expired, delete the record from the table
    // and throw an Unauthorized exception
    if (expiresIn < currentTimestamp) {
      await this.tokenService.deleteRefreshToken(refreshToken);
      throw new UnauthorizedException('Unauthorized');
    } // generate a new pair of tokens and update the record

    // Если запись с валидным refreshToken в таблице найдена,
    if (existingRefreshTokenRow) {
      const payload = {
        username,
        sub: userId,
      };

      // Generate a new pair of accessToken, refreshToken and expiresIn
      const tokens = this.getTokens(payload);

      // Getting data from a new refreshToken
      const decodedNewRefreshToken: TDecodedToken = this.jwtService.decode(
        tokens.refreshToken,
      ) as TDecodedToken;

      // If the new refreshToken decoded without errors
      if (
        typeof decodedNewRefreshToken !== 'string' &&
        decodedNewRefreshToken?.username
      ) {
        const value: UpdateRefreshTokenInput = {
          id: recordId,
          userId,
          refreshToken: tokens.refreshToken,
          expiresIn: decodedNewRefreshToken.exp,
          fingerprint,
        };
        // Update refreshToken in session table
        await this.tokenService.updateRefreshToken(value);
        return tokens;
      }
    }
    throw new UnauthorizedException('Unauthorized');
  }
}
