import ServicePack from './service-pack.model';

export const servicePackProviders = [
  {
    provide: 'SERVICE_PACK_REPOSITORY',
    useValue: ServicePack,
  },
];
