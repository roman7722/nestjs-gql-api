import WardSocialStatus from './ward-social-status.model';

export const wardSocialStatusProviders = [
  {
    provide: 'WARD_SOCIAL_STATUS_REPOSITORY',
    useValue: WardSocialStatus,
  },
];
