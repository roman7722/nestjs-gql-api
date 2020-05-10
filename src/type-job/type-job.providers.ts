import TypeJob from './type-job.model';

export const typeJobProviders = [
  {
    provide: 'TYPE_JOB_REPOSITORY',
    useValue: TypeJob,
  },
];
