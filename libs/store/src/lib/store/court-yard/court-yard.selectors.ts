// court-yard.selectors.ts
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourtYardState } from './court-yard.reducer';
import { selectCourtGroupState } from '../court-group/court-group.selectors';

export const selectCourtYardState = createFeatureSelector<CourtYardState>('courtYard');

export const selectAllCourtYards = createSelector(
  selectCourtYardState,
  (state: CourtYardState) => state.courtYards
);

export const selectCourtYardError = createSelector(
  selectCourtYardState,
  (state: CourtYardState) => state.error
);

export const selectCourtYardActions = createSelector(
  selectCourtYardState,
  (state: CourtYardState) => state.courtYardActions
);

export const selectCourtYardPagedResponse = createSelector(
  selectCourtYardState,
  (state) => state.pagedResponse
);


