import BonusCategory from './bonus-category.model';

export const bonusCategoryProviders = [
  {
    provide: 'BONUS_CATEGORY_REPOSITORY',
    useValue: BonusCategory,
  },
];
