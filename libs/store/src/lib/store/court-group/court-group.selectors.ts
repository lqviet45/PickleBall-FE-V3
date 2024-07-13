import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourtGroupState } from './court-group.reducer';

// Select the CourtGroupState from the global state
export const selectCourtGroupState = createFeatureSelector<CourtGroupState>('courtGroups');

// Select the courtGroups array from the CourtGroupState
export const selectAllCourtGroups = createSelector(
  selectCourtGroupState,
  (state: CourtGroupState) => state.courtGroups
);

// Select the error property from the CourtGroupState
export const selectCourtGroupError = createSelector(
  selectCourtGroupState,
  (state: CourtGroupState) => state.error
);
export const selectCourtGroupById = (courtGroupId: string) => createSelector(
  selectAllCourtGroups,
  (courtGroups) => courtGroups.find(group => group.id === courtGroupId)
);

export const selectCourtGroupCreated = createSelector(
  selectCourtGroupState,
  (state: CourtGroupState) => state.courtGroupCreated
);

export const selectCourtGroupByOwnerId = (ownerId: string) => createSelector(
  selectAllCourtGroups,
  (courtGroups) => courtGroups.filter(group => group.userId === ownerId)
);

export const selectCourtGroupPagedResponse = createSelector(
  selectCourtGroupState,
  (state) => state.pagedResponse
);


