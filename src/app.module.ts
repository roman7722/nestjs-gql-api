import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AgreementStatusModule } from './agreement-status/agreement-status.module';
import { AgreementModule } from './agreement/agreement.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BonusCategoryModule } from './bonus-category/bonus-category.module';
import { BonusModule } from './bonus/bonus.module';
import { CityModule } from './city/city.module';
import { graphqlError } from './common/filters/graphqlError';
import { CustomerCategoryModule } from './customer-category/customer-category.module';
import { CustomerModule } from './customer/customer.module';
import { DistrictModule } from './district/district.module';
import { EmployeeBonusModule } from './employee-bonus/employee-bonus.module';
import { EmployeePositionModule } from './employee-position/employee-position.module';
import { EmployeeStatusModule } from './employee-status/employee-status.module';
import { EmployeeTypeJobModule } from './employee-type-job/employee-type-job.module';
import { EmployeeModule } from './employee/employee.module';
import { ExecutionStatusModule } from './execution-status/execution-status.module';
import { FamilyStatusModule } from './family-status/family-status.module';
import { OperationModeModule } from './operation-mode/operation-mode.module';
import { PaymentFormModule } from './payment-form/payment-form.module';
import { PaymentStatusModule } from './payment-status/payment-status.module';
import { PositionModule } from './position/position.module';
import { QuarterModule } from './quarter/quarter.module';
import { ServiceCategoryModule } from './service-category/service-category.module';
import { ServiceGridModule } from './service-grid/service-grid.module';
import { ServiceGuideModule } from './service-guide/service-guide.module';
import { ServicePackModule } from './service-pack/service-pack.module';
import { SocialStatusModule } from './social-status/social-status.module';
import { SubjectCategoryModule } from './subject-category/subject-category.module';
import { SubjectModule } from './subject/subject.module';
import { TypeJobModule } from './type-job/type-job.module';
import { UserRoleModule } from './user-role/user-role.module';
import { UserModule } from './user/user.module';
import { WardSocialStatusModule } from './ward-social-status/ward-social-status.module';
import { WardStageProgressModule } from './ward-stage-progress/ward-stage-progress.module';
import { WardStageModule } from './ward-stage/ward-stage.module';
import { WardModule } from './ward/ward.module';
import { WhatAboutUsModule } from './what-about-us/what-about-us.module';

const modules = [
  UserRoleModule,
  AgreementModule,
  CityModule,
  DistrictModule,
  QuarterModule,
  SocialStatusModule,
  FamilyStatusModule,
  WardStageModule,
  WardStageProgressModule,
  WardModule,
  WardSocialStatusModule,
  WhatAboutUsModule,
  SubjectCategoryModule,
  SubjectModule,
  CustomerCategoryModule,
  PaymentFormModule,
  CustomerModule,
  AgreementStatusModule,
  PositionModule,
  EmployeePositionModule,
  OperationModeModule,
  EmployeeStatusModule,
  BonusCategoryModule,
  BonusModule,
  EmployeeBonusModule,
  EmployeeModule,
  TypeJobModule,
  EmployeeTypeJobModule,
  PaymentStatusModule,
  ExecutionStatusModule,
  ServicePackModule,
  ServiceCategoryModule,
  ServiceGuideModule,
  ServiceGridModule,
];

@Module({
  imports: [
    AuthModule,
    UserModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
      debug: false,
      playground: process.env.GRAPHQL_PLAYGROUND === 'true',
      formatError: graphqlError,
    }),
    ...modules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
