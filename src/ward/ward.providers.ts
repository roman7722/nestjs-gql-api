import Ward from './ward.model';

export const wardProviders = [
  {
    provide: 'WARD_REPOSITORY',
    useValue: Ward,
  },
];
