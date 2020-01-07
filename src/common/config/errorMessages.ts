import { HttpStatus } from '@nestjs/common';
import { IErrorMessages } from './interfaces/IErrorMessages';

export const errorMessagesConfig: { [messageCode: string]: IErrorMessages } = {
  'auth:login:badUsernameOrPassword': {
    type: 'BadRequest',
    httpStatus: HttpStatus.UNAUTHORIZED,
    errorMessage: 'Unable to login, incorrect username or password.',
    userMessage: 'Невозможно войти, неверное имя пользователя или пароль.',
  },
  'user:create:unableToCreateUser': {
    type: 'BadRequest',
    httpStatus: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create user.',
    userMessage: 'Невозможно создать пользователя.',
  },
  'common:route:notFound': {
    type: 'NotFound',
    httpStatus: HttpStatus.NOT_FOUND,
    errorMessage: 'No route found.',
    userMessage: 'Не найден маршрут.',
  },
  'common:route:forbidden': {
    type: 'Forbidden',
    httpStatus: HttpStatus.FORBIDDEN,
    errorMessage: 'Forbidden resource.',
    userMessage: 'Запрещенный ресурс.',
  },
};
