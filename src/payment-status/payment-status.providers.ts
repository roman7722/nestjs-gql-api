import PaymentStatus from './payment-status.model';

export const paymentStatusProviders = [
  {
    provide: 'PAYMENT_STATUS_REPOSITORY',
    useValue: PaymentStatus,
  },
];
