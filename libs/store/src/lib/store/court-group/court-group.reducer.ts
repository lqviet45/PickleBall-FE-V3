import { createReducer, on } from '@ngrx/store';
import * as CourtGroupActions from './court-group.action';
import { CourtGroup } from './court-group.model';

export interface CourtGroupState {
  courtGroups: CourtGroup[];
  error: string | null;
}

export const initialState: CourtGroupState = {
  courtGroups: [],
  error: null
};

export const courtGroupReducer = createReducer(
  initialState,
  on(CourtGroupActions.loadCourtGroupsSuccess, (state, { courtGroups }) => ({
    ...state,
    courtGroups: courtGroups
  })),
  on(CourtGroupActions.loadCourtGroupsFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
