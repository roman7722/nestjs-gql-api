import Subject from './subject.model';

export const subjectProviders = [
  {
    provide: 'SUBJECT_REPOSITORY',
    useValue: Subject,
  },
];
