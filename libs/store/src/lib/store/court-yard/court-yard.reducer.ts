// court-yard.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as CourtYardActions from './court-yard.actions';
import { CourtYard } from './court-yard.model';

export interface CourtYardState {
  courtYards: CourtYard[];
  error: string | null;
}

export const courtYardInitialState: CourtYardState = {
  courtYards: [],
  error: null
};

export const courtYardReducer = createReducer(
  courtYardInitialState,
  on(CourtYardActions.loadCourtYardsSuccess, (state, { courtYards }) => ({
    ...state,
    courtYards: courtYards
  })),
  on(CourtYardActions.loadCourtYardsFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
