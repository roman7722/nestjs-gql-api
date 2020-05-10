import EmployeeStatus from './employee-status.model';

export const employeeStatusProviders = [
  {
    provide: 'EMPLOYEE_STATUS_REPOSITORY',
    useValue: EmployeeStatus,
  },
];
