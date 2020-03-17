import { HttpStatus } from '@nestjs/common';
import { IErrorMessages } from './interfaces/IErrorMessages';

export const errorMessagesConfig: { [messageCode: string]: IErrorMessages } = {
  /** -------------------- auth -------------------- */

  'auth:login:badUsernameOrPassword': {
    type: 'BadRequest',
    statusCode: HttpStatus.UNAUTHORIZED,
    errorMessage: 'Unable to login, incorrect username or password.',
    userMessage: 'Невозможно войти, неверное имя пользователя или пароль.',
  },

  /** -------------------- common -------------------- */

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

  /** -------------------- userRole -------------------- */

  'userRole:create:unableToCreateUserRole': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create userRole.',
    userMessage: 'Невозможно создать роль пользователя.',
  },
  'userRole:update:unableToUpdateUserRole': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to update userRole.',
    userMessage: 'Невозможно обновить роль пользователя.',
  },
  'userRole:validate:notUniqueUserRoleId': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'User role already exists.',
    userMessage: 'Роль пользователя уже существует.',
  },

  /** -------------------- user -------------------- */

  'user:create:unableToCreateUser': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create user.',
    userMessage: 'Невозможно создать пользователя.',
  },
  'user:update:unableToUpdateUser': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to update user.',
    userMessage: 'Невозможно обновить профиль пользователя.',
  },
  'user:validate:notUniqueUserName': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'User name already exists.',
    userMessage: 'Пользователь с таким именем уже существует.',
  },

  /** -------------------- city -------------------- */

  'city:create:unableToCreateCity': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create city.',
    userMessage: 'Невозможно создать населённый пункт.',
  },
  'city:update:unableToUpdateCity': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to update city.',
    userMessage: 'Невозможно обновить населённый пункт.',
  },
  'city:validate:notUniqueCityName': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'City name already exists.',
    userMessage: 'Наименование населенного пункта уже существует.',
  },

  /** -------------------- district -------------------- */

  'district:create:unableToCreateDistrict': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create district.',
    userMessage: 'Невозможно создать район.',
  },
  'district:update:unableToUpdateDistrict': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to update district.',
    userMessage: 'Невозможно обновить район.',
  },
  'district:validate:notUniqueDistrictName': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'District name already exists.',
    userMessage: 'Наименование района уже существует.',
  },

  /** -------------------- quarter -------------------- */

  'quarter:create:unableToCreateQuarter': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create quarter.',
    userMessage: 'Невозможно создать квартал.',
  },
  'quarter:update:unableToUpdateQuarter': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to update quarter.',
    userMessage: 'Невозможно обновить квартал.',
  },
  'quarter:validate:notUniqueQuarterName': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Quarter name already exists.',
    userMessage: 'Наименование квартала уже существует.',
  },

  /** -------------------- socialStatus -------------------- */

  'socialStatus:create:unableToCreateSocialStatus': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create social status.',
    userMessage: 'Невозможно создать социальный статус.',
  },
  'socialStatus:update:unableToUpdateSocialStatus': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to update social status.',
    userMessage: 'Невозможно обновить социальный статус.',
  },
  'socialStatus:validate:notUniqueSocialStatusName': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'SocialStatus name already exists.',
    userMessage: 'Наименование социального статуса уже существует.',
  },

  /** -------------------- familyStatus -------------------- */

  'familyStatus:create:unableToCreateFamilyStatus': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create family status.',
    userMessage: 'Невозможно создать семейный статус.',
  },
  'familyStatus:update:unableToUpdateFamilyStatus': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to update family status.',
    userMessage: 'Невозможно обновить семейный статус.',
  },
  'familyStatus:validate:notUniqueFamilyStatusName': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Family status name already exists.',
    userMessage: 'Наименование семейного статуса уже существует.',
  },

  /** -------------------- wardStage -------------------- */

  'wardStage:create:unableToCreateWardStage': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create ward stage name.',
    userMessage: 'Невозможно создать наименование этапа подопечного.',
  },
  'wardStage:update:unableToUpdateWardStage': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to update ward stage name.',
    userMessage: 'Невозможно обновить наименование этапа подопечного.',
  },
  'wardStage:validate:notUniqueWardStageName': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Ward stage name already exists.',
    userMessage: 'Наименование этапа уже существует.',
  },

  /** -------------------- ward -------------------- */

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

  /** -------------------- subjectCategory -------------------- */

  'subjectCategory:create:unableToCreateSubjectCategory': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create subject category.',
    userMessage: 'Невозможно создать категорию субъекта.',
  },
  'subjectCategory:update:unableToUpdateSubjectCategory': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to update subject category.',
    userMessage: 'Невозможно обновить категорию субъекта.',
  },
  'subjectCategory:validate:notUniqueSubjectCategoryName': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Category of subjects already exists.',
    userMessage: 'Категория субъекта уже существует.',
  },

  /** -------------------- subject -------------------- */

  'subject:create:unableToCreateSubject': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create subject.',
    userMessage: 'Невозможно создать субъект.',
  },
  'subject:update:unableToUpdateSubject': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to update subject.',
    userMessage: 'Невозможно обновить субъект.',
  },
  'subject:validate:notUniqueSubjectName': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Subject name already exists.',
    userMessage: 'Наименование субъекта уже существует.',
  },

  /** -------------------- whatAboutUs -------------------- */

  'whatAboutUs:create:unableToCreateWhatAboutUs': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create What About Us.',
    userMessage: 'Невозможно создать наименование Как узнали о нас.',
  },
  'whatAboutUs:update:unableToUpdateWhatAboutUs': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to update What About Us.',
    userMessage: 'Невозможно обновить наименование Как узнали о нас.',
  },
  'whatAboutUs:validate:notUniqueWhatAboutUsName': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'What About Us name already exists.',
    userMessage: 'Наименование Как узнали о нас уже существует.',
  },

  /** -------------------- customerCategory -------------------- */

  'customerCategory:create:unableToCreateCustomerCategory': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create customer category.',
    userMessage: 'Невозможно создать категорию клиента.',
  },
  'customerCategory:update:unableToUpdateCustomerCategory': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to update customer category.',
    userMessage: 'Невозможно обновить наименование категории клиента.',
  },
  'customerCategory:validate:notUniqueCustomerCategoryName': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Customer category name already exists.',
    userMessage: 'Наименование категории клиента уже существует.',
  },

  /** -------------------- paymentForm -------------------- */

  'paymentForm:create:unableToCreatePaymentForm': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create payment form.',
    userMessage: 'Невозможно создать форму оплаты.',
  },
  'paymentForm:update:unableToUpdatePaymentForm': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to update payment form.',
    userMessage: 'Невозможно обновить форму оплаты.',
  },
  'paymentForm:validate:notUniquePaymentFormName': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Payment form name already exists.',
    userMessage: 'Наименование формы оплаты уже существует.',
  },

  /** -------------------- customer -------------------- */

  'customer:create:unableToCreateCustomer': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create customer.',
    userMessage: 'Невозможно создать клиента.',
  },
  'customer:update:unableToUpdateCustomer': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to update customer.',
    userMessage: 'Невозможно обновить клиента.',
  },
};
