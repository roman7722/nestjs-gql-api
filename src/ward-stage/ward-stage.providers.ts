import WardStage from './ward-stage.model';

export const wardStageProviders = [
  {
    provide: 'WARD_STAGE_REPOSITORY',
    useValue: WardStage,
  },
];
