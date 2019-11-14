import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { tokenProviders } from './token.providers';
import { TokenResolver } from './token.resolver';
import { TokenService } from './token.service';

@Module({
  imports: [DatabaseModule],
  providers: [TokenService, TokenResolver, ...tokenProviders],
  exports: [TokenModule, TokenService],
})
export class TokenModule {}
