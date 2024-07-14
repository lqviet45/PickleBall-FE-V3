import { createAction, props } from '@ngrx/store';
import { CourtGroup } from './court-group.model';
import { PagedResponse } from '../PagedResponse.model';

export const loadCourtGroups = createAction(
  '[CourtGroup] Load CourtGroups',
  props<{ pageNumber: number; pageSize: number }>()
);
export const loadCourtGroupsSuccess = createAction(
  '[CourtGroup] Load CourtGroups Success',
  props<{ pagedResponse: PagedResponse<CourtGroup> }>()
);
export const loadCourtGroupsFailure = createAction(
  '[CourtGroup] Load CourtGroups Failure',
  props<{ error: any }>()
);

export const loadCourtGroupByOwnerId = createAction(
  '[CourtGroup] Load CourtGroup By OwnerId',
  props<{ ownerId: string, pageNumber: number, pageSize: number }>()
);

export const createCourtGroup = createAction(
  '[CourtGroup] Create CourtGroup',
  props<{ courtGroup: CourtGroup }>()
);

export const createCourtGroupSuccess = createAction(
  '[CourtGroup] Create CourtGroup Success',
  props<{ courtGroup: CourtGroup }>()
);

export const createCourtGroupFailure = createAction(
  '[CourtGroup] Create CourtGroup Failure',
  props<{ error: any }>()
)
export const searchCourtGroups = createAction(
  '[CourtGroup] Search CourtGroups',
  props<{ name: string, cityName: string, pageNumber: number, pageSize: number }>()
);
export const searchCourtGroupsSuccess = createAction(
  '[CourtGroup] Search CourtGroups Success',
  props<{ pagedResponse: PagedResponse<CourtGroup> }>()
);
export const searchCourtGroupsFailure = createAction(
  '[CourtGroup] Search CourtGroups Failure',
  props<{ error: any }>()
);


export const deleteCourtGroup = createAction(
  '[CourtGroup] Delete Court Group',
  props<{ id: string }>()
);

export const deleteCourtGroupSuccess = createAction(
  '[CourtGroup] Delete Court Group Success',
  props<{ id: string }>()
);

export const deleteCourtGroupFailure = createAction(
  '[CourtGroup] Delete Court Group Failure',
  props<{ error: string }>()
);

export const updateCourtGroup = createAction(
  '[CourtGroup] Update Court Group',
  props<{ courtGroup: CourtGroup }>()
);

export const updateCourtGroupSuccess = createAction(
  '[CourtGroup] Update Court Group Success',
  props<{ courtGroup: CourtGroup }>()
);

export const updateCourtGroupFailure = createAction(
  '[CourtGroup] Update Court Group Failure',
  props<{ error: string }>()
);

export const loadCourtGroupWithRevenueByOwnerId = createAction(
  '[CourtGroup] Load CourtGroup By OwnerId',
  props<{ ownerId: string, month: string; year: string }>()
);


