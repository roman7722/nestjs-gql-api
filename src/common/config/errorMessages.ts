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
  'ward:validate:notUniquePassportNumber': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Passport number already exists.',
    userMessage: 'Такой номер паспорта уже существует.',
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

  /** -------------------- agreement -------------------- */

  'agreement:create:unableToCreateAgreement': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create agreement.',
    userMessage: 'Невозможно создать договор.',
  },
  'agreement:update:unableToUpdateAgreement': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to update agreement.',
    userMessage: 'Невозможно обновить договор.',
  },
  'agreement:validate:notUniqueAgreementNumber': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Agreement number already exists.',
    userMessage: 'Номер договора уже существует.',
  },

  /** -------------------- agreementStatus -------------------- */

  'agreementStatus:create:unableToCreateAgreementStatus': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create agreement status.',
    userMessage: 'Невозможно создать статус договора.',
  },
  'agreementStatus:update:unableToUpdateAgreementStatus': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to update agreement status.',
    userMessage: 'Невозможно обновить статуса договора.',
  },
  'agreementStatus:validate:notUniqueAgreementStatusName': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Agreement status name already exists.',
    userMessage: 'Наименование статуса договора уже существует.',
  },

  /** -------------------- position -------------------- */

  'position:create:unableToCreatePosition': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create position.',
    userMessage: 'Невозможно создать должность.',
  },
  'position:update:unableToUpdatePosition': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to update position.',
    userMessage: 'Невозможно обновить должность.',
  },
  'position:validate:notUniquePositionName': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Position name already exists.',
    userMessage: 'Наименование должности уже существует.',
  },

  /** -------------------- employeePosition -------------------- */

  'employeePosition:create:unableToCreateEmployeePosition': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create employeePosition.',
    userMessage: 'Невозможно создать должность сотрудника.',
  },
  'employeePosition:update:unableToUpdateEmployeePosition': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to update employeePosition.',
    userMessage: 'Невозможно обновить должность сотрудника.',
  },

  /** -------------------- operationMode -------------------- */

  'operationMode:create:unableToCreateOperationMode': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create operation mode name.',
    userMessage: 'Невозможно создать режим работы.',
  },
  'operationMode:update:unableToUpdateOperationMode': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to update operation mode name.',
    userMessage: 'Невозможно обновить режим работы.',
  },
  'operationMode:validate:notUniqueOperationModeName': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Operation mode name already exists.',
    userMessage: 'Наименование режима работы уже существует.',
  },

  /** -------------------- employeeStatus -------------------- */

  'employeeStatus:create:unableToCreateEmployeeStatus': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create employee status name.',
    userMessage: 'Невозможно создать статус сотрудника.',
  },
  'employeeStatus:update:unableToUpdateEmployeeStatus': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to update employee status name.',
    userMessage: 'Невозможно обновить статус сотрудника.',
  },

  /** -------------------- bonusCategory -------------------- */

  'bonusCategory:create:unableToCreateBonusCategory': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create bonus category name.',
    userMessage: 'Невозможно создать категорию НиУ.',
  },
  'bonusCategory:update:unableToUpdateBonusCategory': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to update bonus category name.',
    userMessage: 'Невозможно обновить категорию НиУ.',
  },
  'bonusCategory:validate:notUniqueBonusCategoryName': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Employee status name already exists.',
    userMessage: 'Наименование категории НиУ уже существует.',
  },

  /** -------------------- bonus -------------------- */

  'bonus:create:unableToCreateBonus': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create bonus.',
    userMessage: 'Невозможно создать запись НиУ.',
  },
  'bonus:update:unableToUpdateBonus': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to update bonus.',
    userMessage: 'Невозможно обновить запись НиУ.',
  },
  'bonus:validate:notUniqueBonusName': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Bonus name already exists.',
    userMessage: 'Наименование НиУ уже существует.',
  },

  /** -------------------- employeeBonus -------------------- */

  'employeeBonus:create:unableToCreateEmployeeBonus': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create employee bonus.',
    userMessage: 'Невозможно создать НиУ сотрудника.',
  },
  'employeeBonus:update:unableToUpdateEmployeeBonus': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to update employee bonus.',
    userMessage: 'Невозможно обновить НиУ сотрудника.',
  },

  /** -------------------- employee -------------------- */

  'employee:create:unableToCreateEmployee': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create employee.',
    userMessage: 'Невозможно создать сотрудника.',
  },
  'employee:update:unableToUpdateEmployee': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to update employee.',
    userMessage: 'Невозможно обновить сотрудника.',
  },
  'employee:validate:notUniquePassportNumber': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Passport number already exists.',
    userMessage: 'Такой номер паспорта уже существует.',
  },

  /** -------------------- paymentStatus -------------------- */

  'paymentStatus:create:unableToCreatePaymentStatus': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create payment status.',
    userMessage: 'Невозможно создать статус оплаты.',
  },
  'paymentStatus:update:unableToUpdatePaymentStatus': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to update payment status.',
    userMessage: 'Невозможно обновить статус оплаты.',
  },
  'paymentStatus:validate:notUniquePaymentStatusName': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Payment status name already exists.',
    userMessage: 'Наименование статуса оплаты уже существует.',
  },

  /** -------------------- executionStatus -------------------- */

  'executionStatus:create:unableToCreateExecutionStatus': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create execution status.',
    userMessage: 'Невозможно создать статус выполнения.',
  },
  'executionStatus:update:unableToUpdateExecutionStatus': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to update execution status.',
    userMessage: 'Невозможно обновить статус выполнения.',
  },
  'executionStatus:validate:notUniqueExecutionStatusName': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Execution status name already exists.',
    userMessage: 'Наименование статуса выполнения уже существует.',
  },

  /** -------------------- servicePack -------------------- */

  'servicePack:create:unableToCreateServicePack': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create service pack.',
    userMessage: 'Невозможно создать пакет услуг.',
  },
  'servicePack:update:unableToUpdateServicePack': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to update service pack.',
    userMessage: 'Невозможно обновить пакет услуг.',
  },

  /** -------------------- serviceCategory -------------------- */

  'serviceCategory:create:unableToCreateServiceCategory': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create service category.',
    userMessage: 'Невозможно создать категорию услуги.',
  },
  'serviceCategory:update:unableToUpdateServiceCategory': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to update service category.',
    userMessage: 'Невозможно обновить категорию услуги.',
  },
  'serviceCategory:validate:notUniqueServiceCategoryName': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Execution status name already exists.',
    userMessage: 'Наименование категории услуги уже существует.',
  },

  /** -------------------- serviceGuide -------------------- */

  'serviceGuide:create:unableToCreateServiceGuide': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to create service guide.',
    userMessage: 'Невозможно создать услугу.',
  },
  'serviceGuide:update:unableToUpdateServiceGuide': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Unable to update service guide.',
    userMessage: 'Невозможно обновить услугу.',
  },
  'serviceGuide:validate:notUniqueServiceGuideName': {
    type: 'BadRequest',
    statusCode: HttpStatus.BAD_REQUEST,
    errorMessage: 'Execution status name already exists.',
    userMessage: 'Наименование услуги уже существует.',
  },
};
