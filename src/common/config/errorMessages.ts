import { HttpStatus } from '@nestjs/common';
import { IErrorMessages } from './interfaces/IErrorMessages';

export const errorMessagesConfig: { [messageCode: string]: IErrorMessages } = {
  'auth:login:badUsernameOrPassword': {
    type: 'BadRequest',
    statusCode: HttpStatus.UNAUTHORIZED,
    errorMessage: 'Unable to login, incorrect username or password.',
    userMessage: 'Невозможно войти, неверное имя пользователя или пароль.',
  },
  'common:route:notFound': {
    type: 'NotFound',
    statusCode: HttpStatus.NOT_FOUND,
    errorMessage: 'No route found.',
    userMessage: 'Не найден маршрут.',
  },
  'common:route:forbidden': {
    type: 'Forbidden',
    statusCode: HttpStatus.FORBIDDEN,
    errorMessage: 'Forbidden resource.',
    userMessage: 'Запрещенный ресурс.',
  },
  'common:request:badRequest': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Bad Request.',
    userMessage: 'Неверный запрос.',
  },
  'common:optimisticLockError:preconditionFailed': {
    type: 'OptimisticLockError',
    statusCode: HttpStatus.PRECONDITION_FAILED,
    errorMessage:
      'The version of the record is different from the current one.',
    userMessage: 'Версия записи отличается от актуальной.',
  },
  'common:checkId:notFound': {
    type: 'NotFound',
    statusCode: HttpStatus.NOT_FOUND,
    errorMessage: 'Record does not exist.',
    userMessage: 'Запись не существует.',
  },
  'user:create:unableToCreateUser': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create user.',
    userMessage: 'Невозможно создать пользователя.',
  },
  'city:create:unableToCreateCity': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create city.',
    userMessage: 'Невозможно создать населённый пункт.',
  },
  'district:create:unableToCreateDistrict': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create district.',
    userMessage: 'Невозможно создать район.',
  },
  'quarter:create:unableToCreateQuarter': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create quarter.',
    userMessage: 'Невозможно создать квартал.',
  },
  'socialStatus:create:unableToCreateSocialStatus': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create social status.',
    userMessage: 'Невозможно создать социальный статус.',
  },
  'familyStatus:create:unableToCreateFamilyStatus': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create family status.',
    userMessage: 'Невозможно создать семейный статус.',
  },
  'wardStage:create:unableToCreateWardStage': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create ward status.',
    userMessage: 'Невозможно создать статус подопечного.',
  },
  'ward:create:unableToCreateWard': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create ward.',
    userMessage: 'Невозможно создать подопечного.',
  },
  'ward:update:unableToUpdateWard': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to update ward.',
    userMessage: 'Невозможно обновить подопечного.',
  },
};
