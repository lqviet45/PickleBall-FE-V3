import { createSelector, createFeatureSelector } from '@ngrx/store';
import { RevenuesState } from './revenues.reducer';

export const selectRevenuesState = createFeatureSelector<RevenuesState>('revenues');

export const selectRevenuesData = createSelector(
  selectRevenuesState,
  (state: RevenuesState) => state.data
);

export const selectRevenuesLoading = createSelector(
  selectRevenuesState,
  (state: RevenuesState) => state.loading
);

export const selectRevenuesError = createSelector(
  selectRevenuesState,
  (state: RevenuesState) => state.error
);
