import { Resolver } from '@nestjs/graphql';
import { CityService } from './city.service';

@Resolver()
export class CityResolver {
  constructor(private readonly cityService: CityService) {}
}
