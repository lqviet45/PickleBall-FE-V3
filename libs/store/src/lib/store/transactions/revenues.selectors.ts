import { createSelector, createFeatureSelector } from '@ngrx/store';
import { RevenuesState } from './revenues.reducer';

export const selectRevenuesState = createFeatureSelector<RevenuesState>('revenues');

export const selectRevenuesData = createSelector(
  selectRevenuesState,
  (state: RevenuesState) => state.data
);
export const selectRevenuesData2 = createSelector(
  selectRevenuesState,
  (state: RevenuesState) => state.adminRevenue
);
export const selectRevenuesData3 = createSelector(
  selectRevenuesState,
  (state: RevenuesState) => state.adminRevenueToday
);

export const selectRevenuesLoading = createSelector(
  selectRevenuesState,
  (state: RevenuesState) => state.loading
);

export const selectRevenuesError = createSelector(
  selectRevenuesState,
  (state: RevenuesState) => state.error
);

export const selectCurrentRevenue = createSelector(
  selectRevenuesState,
  (state: RevenuesState) => state.currentRevenue
);

export const selectCourtGroupWithRevenuePaging = createSelector(
  selectRevenuesState,
  (state: RevenuesState) => state.pageResponse
)

export const selectCourtGroupWithRevenue = createSelector(
  selectRevenuesState,
  (state: RevenuesState) => state.courtGroup
)
