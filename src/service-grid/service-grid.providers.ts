import ServiceGrid from './service-grid.model';

export const serviceGridProviders = [
  {
    provide: 'SERVICE_GRID_REPOSITORY',
    useValue: ServiceGrid,
  },
];
