import EmployeePosition from './employee-position.model';

export const employeePositionProviders = [
  {
    provide: 'EMPLOYEE_POSITION_REPOSITORY',
    useValue: EmployeePosition,
  },
];
