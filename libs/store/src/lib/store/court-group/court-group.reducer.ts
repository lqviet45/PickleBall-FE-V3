import { createReducer, on } from '@ngrx/store';
import * as CourtGroupActions from './court-group.action';
import { CourtGroup } from './court-group.model';
import { PagedResponse } from '../PagedResponse.model';


export interface CourtGroupState {
  courtGroups: CourtGroup[];
  pagedResponse: PagedResponse<CourtGroup> | null;
  error: string | null;
  courtGroupCreated: boolean;
}

export const courtGroupInitialState: CourtGroupState = {
  courtGroups: [],
  pagedResponse: null,
  error: null,
  courtGroupCreated: false
};

export const courtGroupReducer = createReducer(
  courtGroupInitialState,
  on(CourtGroupActions.loadCourtGroupsSuccess, (state, { pagedResponse }) => ({
    ...state,
    courtGroups: pagedResponse.items,
    pagedResponse,
    loading: false,
  })),
  on(CourtGroupActions.loadCourtGroupsFailure, (state, { error }) => ({
    ...state,
    error,
    courtGroupCreated: false
  })),
  on(CourtGroupActions.loadCourtGroupByOwnerId, (state) => ({
    ...state,
    error: null,
  })),
  on(CourtGroupActions.createCourtGroupSuccess, (state, { courtGroup }) => ({
    ...state,
    courtGroups: [...state.courtGroups, courtGroup],
    error: null,
    courtGroupCreated: true
  })),
  on(CourtGroupActions.createCourtGroupFailure, (state, { error }) => ({
    ...state,
    error,
    courtGroupCreated: false
  })),
  on(CourtGroupActions.searchCourtGroupsSuccess, (state, { courtGroups }) => ({
    ...state,
    courtGroups,
    error: null,  // Reset the error on success
    courtGroupCreated: false
  })),
  on(CourtGroupActions.searchCourtGroupsFailure, (state, { error }) => ({
    ...state,
    error,
    courtGroupCreated: false
  }))
);
