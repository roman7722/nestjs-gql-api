import CustomerCategory from './customer-category.model';

export const customerCategoryProviders = [
  {
    provide: 'CUSTOMER_CATEGORY_REPOSITORY',
    useValue: CustomerCategory,
  },
];
