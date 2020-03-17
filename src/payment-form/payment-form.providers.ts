import PaymentForm from './payment-form.model';

export const paymentFormProviders = [
  {
    provide: 'PAYMENT_FORM_REPOSITORY',
    useValue: PaymentForm,
  },
];
