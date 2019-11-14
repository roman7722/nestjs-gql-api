import { Resolver } from '@nestjs/graphql';
import { TokenService } from './token.service';

@Resolver()
export class TokenResolver {
  constructor(private readonly tokenService: TokenService) {}
}
