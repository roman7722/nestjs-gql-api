import SocialStatus from './social-status.model';

export const socialStatusProviders = [
  {
    provide: 'SOCIAL_STATUS_REPOSITORY',
    useValue: SocialStatus,
  },
];
