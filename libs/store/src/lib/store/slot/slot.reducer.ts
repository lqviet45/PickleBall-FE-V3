import { createReducer, on, Action } from '@ngrx/store';
import { Slots } from './slot.model'; // Import the Slot model interface
import * as SlotsActions from './slot.actions';

export interface SlotsState {
  slots: Slots[];
  loading: boolean;
  error: any;
}

export const initialSlotsState: SlotsState = {
  slots: [],
  loading: false,
  error: null
};

const _slotsReducer = createReducer(
  initialSlotsState,

  on(SlotsActions.loadSlots, state => ({
    ...state,
    loading: true,
    error: null
  })),

  on(SlotsActions.loadSlotsSuccess, (state, { slots }) => ({
    ...state,
    slots,
    loading: false,
    error: null
  })),

  on(SlotsActions.loadSlotsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

export function slotsReducer(state: SlotsState | undefined, action: Action) {
  return _slotsReducer(state, action);
}
