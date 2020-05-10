import Position from './position.model';

export const positionProviders = [
  {
    provide: 'POSITION_REPOSITORY',
    useValue: Position,
  },
];
