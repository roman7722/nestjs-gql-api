import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AgreementModule } from './agreement/agreement.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CityModule } from './city/city.module';
import { CustomerCategoryModule } from './customer-category/customer-category.module';
import { graphqlError } from './common/filters/graphqlError';
import { CustomerModule } from './customer/customer.module';
import { DistrictModule } from './district/district.module';
import { FamilyStatusModule } from './family-status/family-status.module';
import { PaymentFormModule } from './payment-form/payment-form.module';
import { QuarterModule } from './quarter/quarter.module';
import { SocialStatusModule } from './social-status/social-status.module';
import { SubjectCategoryModule } from './subject-category/subject-category.module';
import { SubjectModule } from './subject/subject.module';
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
