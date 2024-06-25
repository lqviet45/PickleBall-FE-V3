import { createAction, props } from '@ngrx/store';
import { CourtGroup } from './court-group.model';

export const loadCourtGroups = createAction('[CourtGroup] Load CourtGroups');
export const loadCourtGroupsSuccess = createAction(
  '[CourtGroup] Load CourtGroups Success',
  props<{ courtGroups: { id: string, name: string }[] }>()
);
export const loadCourtGroupsFailure = createAction(
  '[CourtGroup] Load CourtGroups Failure',
  props<{ error: any }>()
);

export const loadCourtGroupByOwnerId = createAction(
  '[CourtGroup] Load CourtGroup By OwnerId',
  props<{ ownerId: string }>()
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

