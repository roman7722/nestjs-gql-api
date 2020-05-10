import EmployeeTypeJob from './employee-type-job.model';

export const employeeTypeJobProviders = [
  {
    provide: 'EMPLOYEE_TYPE_JOB_REPOSITORY',
    useValue: EmployeeTypeJob,
  },
];
