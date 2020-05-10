import { Resolver } from '@nestjs/graphql';
import { SessionService } from './session.service';

@Resolver()
export class SessionResolver {
  constructor(private readonly sessionService: SessionService) {}
}
