// court-yard.actions.ts
import { createAction, props } from '@ngrx/store';
import { CourtYard } from './court-yard.model';
import { PagedResponse } from '../PagedResponse.model';

export const loadCourtYards = createAction(
  '[Court Yard] Load Court Yards',
  props<{ courtGroupId: string, pageNumber: number, pageSize: number }>()
);

export const loadCourtYardsSuccess = createAction(
  '[Court Yard] Load Court Yards Success',
  props<{ pagedResponse: PagedResponse<CourtYard> }>()
);

export const loadCourtYardsFailure = createAction(
  '[Court Yard] Load Court Yards Failure',
  props<{ error: string }>()
);

export const createCourtYard = createAction(
  '[Court Yard] Create Court Yard',
  props<{ courtGroupId: string, courtYardName: string }>()
);

export const createCourtYardSuccess = createAction(
  '[Court Yard] Create Court Yard Success',
  props<{ courtYard: CourtYard }>()
);

export const createCourtYardFailure = createAction(
  '[Court Yard] Create Court Yard Failure',
  props<{ error: string }>()
);

export const updateCourtYard = createAction(
  '[Court Yard] Update Court Yard',
  props<{ courtYard: CourtYard }>()
);

export const updateCourtYardSuccess = createAction(
  '[Court Yard] Update Court Yard Success',
  props<{ courtYard: CourtYard }>()
);

export const updateCourtYardFailure = createAction(
  '[Court Yard] Update Court Yard Failure',
  props<{ error: string }>()
);

export const deleteCourtYard = createAction(
  '[Court Yard] Delete Court Yard',
  props<{ id: string }>()
);

export const deleteCourtYardSuccess = createAction(
  '[Court Yard] Delete Court Yard Success',
  props<{ id: string }>()
);

export const deleteCourtYardFailure = createAction(
  '[Court Yard] Delete Court Yard Failure',
  props<{ error: string }>()
);
