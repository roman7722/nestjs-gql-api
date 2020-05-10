import Employee from './employee.model';

export const employeeProviders = [
  {
    provide: 'EMPLOYEE_REPOSITORY',
    useValue: Employee,
  },
];
