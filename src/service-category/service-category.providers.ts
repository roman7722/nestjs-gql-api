import ServiceCategory from './service-category.model';

export const serviceCategoryProviders = [
  {
    provide: 'SERVICE_CATEGORY_REPOSITORY',
    useValue: ServiceCategory,
  },
];
