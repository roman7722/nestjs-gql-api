import WardStageProgress from './ward-stage-progress.model';

export const wardStageProgressProviders = [
  {
    provide: 'WARD_STAGE_PROGRESS_REPOSITORY',
    useValue: WardStageProgress,
  },
];
