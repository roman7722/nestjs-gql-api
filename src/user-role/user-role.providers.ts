import UserRole from './user-role.model';

export const userRoleProviders = [
  {
    provide: 'USER_ROLE_REPOSITORY',
    useValue: UserRole,
  },
];
