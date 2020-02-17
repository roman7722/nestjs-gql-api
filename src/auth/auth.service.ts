import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MessageCodeError } from '../common/error/MessageCodeError';
import { SessionCreateInput } from '../session/inputs/session-create.input';
import { SessionUpdateInput } from '../session/inputs/session-update.input';
import Session from '../session/session.model';
import { SessionService } from '../session/session.service';
import { IPayload, ISessions, TDecodedToken } from '../session/session.types';
import { UserService } from '../user/user.service';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly sessionService: SessionService,
  ) {}

  /**
   * Генерация accessToken, refreshToken и expiresIn
   * @param payload {Payload}
   * @returns {Tokens} Объект содержащий accessToken и refreshToken
   */
  private getTokens(payload: IPayload): ISessions {
    // Генерация accessToken
    const accessToken: string = this.jwtService.sign(
      { ...payload },
      {
        expiresIn: jwtConstants.accessTokenLife,
        algorithm: 'HS256',
      },
    );
    // Генерация refreshToken
    const refreshToken: string = this.jwtService.sign(
      { ...payload },
      {
        expiresIn: jwtConstants.refreshTokenLife,
        algorithm: 'HS512',
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
  ): Promise<ISessions | undefined> {
    // Поиск пользователя в таблице s_user по имени username
    const user = await this.userService.userFind(username);

    if (user && user.passwordHash) {
      // Получение passwordHash из записи найденного пользователя
      const { passwordHash } = user;

      const isMatch: boolean = await AuthService.comparePassword(
        password,
        passwordHash,
      );

      if (!isMatch) {
        // passwords did not match
        throw new MessageCodeError('auth:login:badUsernameOrPassword');
      } else {
        // passwords match
        const userId: number = user.id;
        const payload = { sub: userId };

        // Получаем кол-во записей refreshToken пользователя
        const numberSessions: number = await this.sessionService.numberSessions(
          userId,
        );

        // Если кол-во refreshToken больше допустимого maxNumberSessions,
        // то удаляем все refreshToken пользователя из таблицы
        if (numberSessions >= jwtConstants.maxNumberSessions) {
          await this.sessionService.deleteAllSessions(userId);
        }

        // Генерируем accessToken refreshToken и expiresIn
        const tokens = this.getTokens(payload);

        // Поиск записи в таблице token существующего userId и fingerprint
        const existingRefreshTokenRow: Session = await this.sessionService.findSession(
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
            const value: SessionUpdateInput = {
              id: existingRefreshTokenRow.id,
              userId,
              refreshToken: tokens.refreshToken,
              expiresIn: decodedRefreshToken.exp,
              fingerprint,
            };
            await this.sessionService.updateSession(value);
          } else {
            const data: SessionCreateInput = {
              userId,
              refreshToken: tokens.refreshToken,
              expiresIn: decodedRefreshToken.exp,
              fingerprint,
            };
            await this.sessionService.createSession(data);
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
   * @returns {ISessions} Объект содержащий accessToken и refreshToken
   */
  async regenerateRefreshToken(
    refreshToken: string,
    fingerprint: string,
  ): Promise<ISessions | undefined> {
    // Проверяем существование в таблице session записи где refreshToken соответствует fingerprint
    const existingRefreshTokenRow = await this.sessionService.verifySession(
      refreshToken,
      fingerprint,
    );

    let userId: number = 0;
    let expiresIn: number = 0;
    let recordId: number = 0;

    if (existingRefreshTokenRow?.userId) {
      userId = existingRefreshTokenRow.getDataValue('userId');
      expiresIn = existingRefreshTokenRow.getDataValue('expiresIn');
      recordId = existingRefreshTokenRow.getDataValue('id');
    } else {
      // Если запись не найдена выбрасываем исключение Unauthorized
      throw new UnauthorizedException('Unauthorized');
    }

    // Получаем текущий Unix timestamp в секундах
    const currentTimestamp: number = +Math.round(+new Date() / 1000);

    // Если время жизни refreshToken истекло - удаляем запись из таблицы
    // и генерируем исключение Unauthorized
    if (expiresIn < currentTimestamp) {
      await this.sessionService.deleteSession(recordId);
      throw new UnauthorizedException('Unauthorized');
    }

    // Если запись с валидным refreshToken в таблице найдена,
    // генерируем новую пару токенов и обновляем запись
    if (existingRefreshTokenRow) {
      const payload = {
        sub: userId,
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
        decodedNewRefreshToken?.sub
      ) {
        const value: SessionUpdateInput = {
          id: recordId,
          userId,
          refreshToken: tokens.refreshToken,
          expiresIn: decodedNewRefreshToken.exp,
          fingerprint,
        };
        // Обновляем refreshToken в таблице token
        await this.sessionService.updateSession(value);
        return tokens;
      }
    }
    throw new UnauthorizedException('Unauthorized');
  }
}
