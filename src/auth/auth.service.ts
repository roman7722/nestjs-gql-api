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
   * Генерация accessToken, refreshToken и expiresIn
   * @param payload {Payload}
   * @returns {Tokens} Объект содержащий accessToken и refreshToken
   */
  private getTokens(payload: IPayload): ITokens {
    // Генерация accessToken
    const accessToken: string = this.jwtService.sign(
      { ...payload, isAccessToken: 1 },
      {
        expiresIn: jwtConstants.accessTokenLife,
        algorithm: 'HS256',
      },
    );
    // Генерация refreshToken
    const refreshToken: string = this.jwtService.sign(
      { ...payload, isAccessToken: 0 },
      {
        expiresIn: jwtConstants.refreshTokenLife,
        algorithm: 'HS256',
      },
    );

    // Получение данных из accessToken
    const decodedAccessToken: TDecodedToken = this.jwtService.decode(
      accessToken,
    ) as TDecodedToken;

    // Получение времени жизни accessToken (Unix timestamp)
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
   * Аунтентификация пользователя, генерация accessToken, refreshToken и expiresIn
   * @param username {string}
   * @param password {string}
   * @param fingerprint {string}
   * @returns {Tokens} Объект содержащий accessToken и refreshToken
   */
  async validateUser(
    username: string,
    password: string,
    fingerprint: string,
  ): Promise<ITokens | undefined> {
    // Поиск пользователя в таблице s_user по имени username
    const user = await this.userService.findUser(username);

    if (user && user.passwordHash) {
      // Получение passwordHash из записи найденного пользователя
      const { passwordHash } = user;

      const isMatch: boolean = await AuthService.comparePassword(
        password,
        passwordHash,
      );

      if (!isMatch) {
        // passwords did not match
        // throw new UnauthorizedException('auth:login:badUsernameOrPassword');
        throw new MessageCodeError('auth:login:badUsernameOrPassword');
      } else {
        // passwords match
        const userId: number = user.id;
        const roleId: string = user.roleId;
        const payload = { username, sub: userId, roleId };

        // Получаем кол-во записей refreshToken пользователя
        const numberRefreshTokens: number = await this.tokenService.numberRefreshTokens(
          userId,
        );

        // Если кол-во refreshToken больше допустимого maxNumberRefreshTokens,
        // то удаляем все refreshToken пользователя из таблицы
        if (numberRefreshTokens >= jwtConstants.maxNumberRefreshTokens) {
          await this.tokenService.deleteAllRefreshToken(userId);
        }

        // Генерируем accessToken refreshToken и expiresIn
        const tokens = this.getTokens(payload);

        // Поиск записи в таблице token существующего userId и fingerprint
        const existingRefreshTokenRow: Token = await this.tokenService.findRefreshToken(
          userId,
          fingerprint,
        );

        // Получение данных из refreshToken
        const decodedRefreshToken: TDecodedToken = this.jwtService.decode(
          tokens.refreshToken,
        ) as TDecodedToken;

        // Проверка на существование decodedRefreshToken.exp времени жизни refreshToken
        if (
          typeof decodedRefreshToken !== 'string' &&
          decodedRefreshToken?.exp
        ) {
          if (existingRefreshTokenRow) {
            const value: UpdateRefreshTokenInput = {
              id: existingRefreshTokenRow.id,
              userId,
              roleId,
              refreshToken: tokens.refreshToken,
              expiresIn: decodedRefreshToken.exp,
              fingerprint,
            };
            await this.tokenService.updateRefreshToken(value);
          } else {
            const data: CreateRefreshTokenInput = {
              userId,
              roleId,
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
   * Обновление accessToken, refreshToken и expiresIn
   * @param refreshToken {string}
   * @param fingerprint {string}
   * @returns {Tokens} Объект содержащий accessToken и refreshToken
   */
  async regenerateRefreshToken(
    refreshToken: string,
    fingerprint: string,
  ): Promise<ITokens | undefined> {
    // Ищем в таблице token запись где refreshToken соответствует fingerprint
    const existingRefreshTokenRow = await this.tokenService.verifyRefreshToken(
      refreshToken,
      fingerprint,
    );

    let userId: number = 0;
    let roleId: string = '';
    let expiresIn: number = 0;
    let recordId: number = 0;
    let username: string = '';

    if (existingRefreshTokenRow?.userId) {
      const { getDataValue } = existingRefreshTokenRow;
      userId = getDataValue('userId');
      roleId = getDataValue('roleId');
      expiresIn = getDataValue('expiresIn');
      recordId = getDataValue('id');

      // Получаем данные из нового refreshToken
      const decodedRefreshToken: TDecodedToken = this.jwtService.decode(
        refreshToken,
      ) as TDecodedToken;

      // Если полученный refreshToken декодировался без ошибок
      if (
        typeof decodedRefreshToken !== 'string' &&
        decodedRefreshToken?.username
      ) {
        username = decodedRefreshToken.username;
      }
    } else {
      // Если запись не найдена выбрасываем исключение Unauthorized
      throw new UnauthorizedException('Unauthorized');
    }

    // Получаем текущий Unix timestamp в секундах
    const currentTimestamp: number = +Math.round(+new Date() / 1000);

    // Если время жизни refreshToken истекло - удаляем запись из таблицы
    // и генерируем исключение Unauthorized
    if (expiresIn < currentTimestamp) {
      await this.tokenService.deleteRefreshToken(refreshToken);
      throw new UnauthorizedException('Unauthorized');
    }

    // Если запись с валидным refreshToken в таблице найдена,
    // генерируем новую пару токенов и обновляем запись
    if (existingRefreshTokenRow) {
      const payload = {
        username,
        sub: userId,
        roleId,
      };

      // Генерируем новую пару accessToken, refreshToken и expiresIn
      const tokens = this.getTokens(payload);

      // Получаем данные из нового refreshToken
      const decodedNewRefreshToken: TDecodedToken = this.jwtService.decode(
        tokens.refreshToken,
      ) as TDecodedToken;

      // Если новый refreshToken декодировался без ошибок
      if (
        typeof decodedNewRefreshToken !== 'string' &&
        decodedNewRefreshToken?.username
      ) {
        const value: UpdateRefreshTokenInput = {
          id: recordId,
          userId,
          roleId,
          refreshToken: tokens.refreshToken,
          expiresIn: decodedNewRefreshToken.exp,
          fingerprint,
        };
        // Обновляем refreshToken в таблице token
        await this.tokenService.updateRefreshToken(value);
        return tokens;
      }
    }
    throw new UnauthorizedException('Unauthorized');
  }
}
