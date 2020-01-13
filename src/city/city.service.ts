import { Inject, Injectable } from '@nestjs/common';
import City from './city.model';

@Injectable()
export class CityService {
  constructor(
    @Inject('CITY_REPOSITORY') private readonly CITY_REPOSITORY: typeof City,
  ) {}
}
