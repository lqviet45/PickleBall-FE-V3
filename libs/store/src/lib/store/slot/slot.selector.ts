import { createSelector, createFeatureSelector } from '@ngrx/store';
import { SlotsState } from './slot.reducer';

export const selectSlotsState = createFeatureSelector<SlotsState>('slots');

export const selectAllSlots = createSelector(
  selectSlotsState,
  (state: SlotsState) => state.slots
);

export const selectSlotsLoading = createSelector(
  selectSlotsState,
  (state: SlotsState) => state.loading
);

export const selectSlotsError = createSelector(
  selectSlotsState,
  (state: SlotsState) => state.error
);
