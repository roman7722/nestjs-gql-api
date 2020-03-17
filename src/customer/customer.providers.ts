import Customer from './customer.model';

export const customerProviders = [
  {
    provide: 'CUSTOMER_REPOSITORY',
    useValue: Customer,
  },
];
