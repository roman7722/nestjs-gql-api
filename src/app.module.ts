import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AgreementModule } from './agreement/agreement.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserRoleModule } from './user-role/user-role.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
      context: ({ req }) => ({ req }),
      debug: false,
      playground: process.env.GRAPHQL_PLAYGROUND === 'true',
    }),
    UserRoleModule,
    AgreementModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
