import { createReducer, on } from '@ngrx/store';
import * as CourtGroupActions from './court-group.action';
import { CourtGroup } from './court-group.model';
import { state } from '@angular/animations';
import { error } from 'ng-packagr/lib/utils/log';

export interface CourtGroupState {
  courtGroups: CourtGroup[];
  error: string | null;
}

export const courtGroupInitialState: CourtGroupState = {
  courtGroups: [],
  error: null
};

export const courtGroupReducer = createReducer(
  courtGroupInitialState,
  on(CourtGroupActions.loadCourtGroupsSuccess, (state, { courtGroups }) => ({
    ...state,
    courtGroups: courtGroups
  })),
  on(CourtGroupActions.loadCourtGroupsFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(CourtGroupActions.loadCourtGroupByOwnerId, (state) => ({
    ...state,
    error: null,
  })),
  on(CourtGroupActions.createCourtGroupSuccess, (state, { courtGroup }) => ({
    ...state,
    courtGroups: [...state.courtGroups, courtGroup],
    error: null
  })),
  on(CourtGroupActions.createCourtGroupFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
