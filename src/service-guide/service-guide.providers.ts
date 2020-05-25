import ServiceGuide from './service-guide.model';

export const serviceGuideProviders = [
  {
    provide: 'SERVICE_GUIDE_REPOSITORY',
    useValue: ServiceGuide,
  },
];
