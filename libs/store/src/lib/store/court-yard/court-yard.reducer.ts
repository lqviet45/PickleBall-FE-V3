// court-yard.reducer.ts
import { createReducer, on } from '@ngrx/store';
import * as CourtYardActions from './court-yard.actions';
import { CourtYard } from './court-yard.model';

export interface CourtYardState {
  courtYards: CourtYard[];
  error: string | null;
  courtYardActions: boolean
}

export const courtYardInitialState: CourtYardState = {
  courtYards: [],
  error: null,
  courtYardActions: false
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
  })),
  on(CourtYardActions.createCourtYardSuccess, (state, { courtYard }) => ({
    ...state,
    courtYards: [...state.courtYards, courtYard],
    error: null,
    courtYardActions: true
  })),
  on(CourtYardActions.createCourtYardFailure, (state, { error }) => ({
    ...state,
    error,
    courtYardActions: false
  })),
  on(CourtYardActions.updateCourtYardSuccess, (state, { courtYard }) => {
    const updatedCourtYards = state.courtYards.map(item => item.id === courtYard.id ? courtYard : item);
    return {
      ...state,
      courtYards: updatedCourtYards,
      error: null,
      courtYardActions: true
    }
  }),
  on(CourtYardActions.updateCourtYardFailure, (state, { error }) => ({
    ...state,
    error,
    courtYardActions: false
  })
  ),
  on(CourtYardActions.deleteCourtYardSuccess, (state, { id }) => ({
    ...state,
    courtYards: state.courtYards.filter(item => item.id !== id),
    error: null,
    courtYardActions: true
  })),
  on(CourtYardActions.deleteCourtYardFailure, (state, { error }) => ({
    ...state,
    error,
    courtYardActions: false
  })),
);
