import ExecutionStatus from './execution-status.model';

export const executionStatusProviders = [
  {
    provide: 'EXECUTION_STATUS_REPOSITORY',
    useValue: ExecutionStatus,
  },
];
