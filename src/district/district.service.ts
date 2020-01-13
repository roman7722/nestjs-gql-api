import { Inject, Injectable } from '@nestjs/common';
import District from './district.model';

@Injectable()
export class DistrictService {
  constructor(
    @Inject('DISTRICT_REPOSITORY')
    private readonly DISTRICT_REPOSITORY: typeof District,
  ) {}
}
