import { createAction, createActionGroup, props } from '@ngrx/store';
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

