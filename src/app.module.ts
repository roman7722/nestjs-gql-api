import { GraphQLError } from 'graphql/error/GraphQLError';
import { BadRequestException, ForbiddenException, HttpException, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AgreementModule } from './agreement/agreement.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CityModule } from './city/city.module';
import { MessageCodeError } from './common/lib/error/MessageCodeError';
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
      formatError: (error: GraphQLError) => {
        // console.log(error.message);

        /** Error 400 */
        if (error.originalError instanceof BadRequestException) {
          return new BadRequestException('BadRequestException');
        }
        /** Error 403 */
        if (error.originalError instanceof ForbiddenException) {
          const response = error.originalError.getResponse();
          const status = error.originalError.getStatus();
          return new HttpException(response, status);
        }
        /** JsonWebTokenError from DispatchError */
        if (error.message.startsWith('JsonWebTokenError')) {
          return new BadRequestException('JsonWebTokenError');
        }
        /** AuthenticationError from DispatchError */
        if (error.message.startsWith('AuthenticationError')) {
          return new BadRequestException('AuthenticationError');
        }
        /** MessageCodeError from DispatchError */
        if (error.originalError instanceof MessageCodeError) {
          return error?.extensions?.exception;
        }
      },
    }),
    UserRoleModule,
    AgreementModule,
    CityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
