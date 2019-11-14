import Agreement from './agreement.model';

export const agreementProviders = [
  {
    provide: 'AGREEMENT_REPOSITORY',
    useValue: Agreement,
  },
];
