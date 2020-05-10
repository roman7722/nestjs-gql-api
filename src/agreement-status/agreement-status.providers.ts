import AgreementStatus from './agreement-status.model';

export const agreementStatusProviders = [
  {
    provide: 'AGREEMENT_STATUS_REPOSITORY',
    useValue: AgreementStatus,
  },
];
