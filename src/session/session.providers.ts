import Session from './session.model';

export const sessionProviders = [
  {
    provide: 'SESSION_REPOSITORY',
    useValue: Session,
  },
];
