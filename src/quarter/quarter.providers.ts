import Quarter from './quarter.model';

export const quarterProviders = [
  {
    provide: 'QUARTER_REPOSITORY',
    useValue: Quarter,
  },
];
