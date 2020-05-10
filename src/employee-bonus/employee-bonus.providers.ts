import EmployeeBonus from './employee-bonus.model';

export const employeeBonusProviders = [
  {
    provide: 'EMPLOYEE_BONUS_REPOSITORY',
    useValue: EmployeeBonus,
  },
];
