import SubjectCategory from './subject-category.model';

export const subjectCategoryProviders = [
  {
    provide: 'SUBJECT_CATEGORY_REPOSITORY',
    useValue: SubjectCategory,
  },
];
