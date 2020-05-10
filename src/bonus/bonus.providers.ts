import Bonus from './bonus.model';

export const bonusProviders = [
  {
    provide: 'BONUS_REPOSITORY',
    useValue: Bonus,
  },
];
