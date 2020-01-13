import City from './city.model';

export const cityProviders = [
  {
    provide: 'CITY_REPOSITORY',
    useValue: City,
  },
];
