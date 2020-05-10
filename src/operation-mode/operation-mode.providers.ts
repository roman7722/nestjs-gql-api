import OperationMode from './operation-mode.model';

export const operationModeProviders = [
  {
    provide: 'OPERATION_MODE_REPOSITORY',
    useValue: OperationMode,
  },
];
