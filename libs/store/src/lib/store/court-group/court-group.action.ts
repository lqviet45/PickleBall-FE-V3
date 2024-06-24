import { createAction, props } from '@ngrx/store';

export const loadCourtGroups = createAction('[CourtGroup] Load CourtGroups');
export const loadCourtGroupsSuccess = createAction(
  '[CourtGroup] Load CourtGroups Success',
  props<{ courtGroups: { id: string, name: string }[] }>()
);
export const loadCourtGroupsFailure = createAction(
  '[CourtGroup] Load CourtGroups Failure',
  props<{ error: any }>()
);
