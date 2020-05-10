import FamilyStatus from './family-status.model';

export const familyStatusProviders = [
  {
    provide: 'FAMILY_STATUS_REPOSITORY',
    useValue: FamilyStatus,
  },
];
