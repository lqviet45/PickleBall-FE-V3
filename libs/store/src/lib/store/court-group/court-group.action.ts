import { createAction, createActionGroup, props } from '@ngrx/store';
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
  props<{ name: string, cityName: string }>()
);
export const searchCourtGroupsSuccess = createAction(
  '[CourtGroup] Search CourtGroups Success',
  props<{ courtGroups: CourtGroup[] }>()
);
export const searchCourtGroupsFailure = createAction(
  '[CourtGroup] Search CourtGroups Failure',
  props<{ error: any }>()
);

