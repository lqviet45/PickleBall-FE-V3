// court-yard.actions.ts
import { createAction, props } from '@ngrx/store';
import { CourtYard } from './court-yard.model';

export const loadCourtYards = createAction(
  '[Court Yard] Load Court Yards',
  props<{ courtGroupId: string }>()
);

export const loadCourtYardsSuccess = createAction(
  '[Court Yard] Load Court Yards Success',
  props<{ courtYards: CourtYard[] }>()
);

export const loadCourtYardsFailure = createAction(
  '[Court Yard] Load Court Yards Failure',
  props<{ error: string }>()
);
