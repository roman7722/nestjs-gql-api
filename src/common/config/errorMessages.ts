import { HttpStatus } from '@nestjs/common';
import { IErrorMessages } from './interfaces/IErrorMessages';

export const errorMessagesConfig: { [messageCode: string]: IErrorMessages } = {
  'auth:login:badUsernameOrPassword': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to login, incorrect username or password.',
    userMessage: 'Невозможно войти, неверное имя пользователя или пароль.',
  },
  'user:create:unableToCreateUser': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create user.',
    userMessage: 'Невозможно создать пользователя.',
  },
};
