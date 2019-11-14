import Token from './token.model';

export const tokenProviders = [
  {
    provide: 'TOKEN_REPOSITORY',
    useValue: Token,
  },
];
