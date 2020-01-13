import District from './district.model';

export const districtProviders = [
  {
    provide: 'DISTRICT_REPOSITORY',
    useValue: District,
  },
];
