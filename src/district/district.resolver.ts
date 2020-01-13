import { Resolver } from '@nestjs/graphql';
import { DistrictService } from './district.service';

@Resolver()
export class DistrictResolver {
  constructor(private readonly districtService: DistrictService) {}
}
