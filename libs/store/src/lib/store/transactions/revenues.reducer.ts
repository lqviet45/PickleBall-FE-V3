import { createReducer, on } from '@ngrx/store';
import * as RevenuesActions from './revenues.actions';
import { AdminRevenueResponse, AdminRevenueTodayResponse, CurrentRevenue, RevenueResponse } from './revenue.model';
import { PagedResponse } from '../PagedResponse.model';
import { CourtGroup } from '../court-group/court-group.model';

export interface RevenuesState {
  data: RevenueResponse | null;
  error: any;
  loading: boolean;
  currentRevenue: CurrentRevenue | null;
  pageResponse: PagedResponse<CourtGroup> | null;
  courtGroup: CourtGroup[];
  adminRevenue: AdminRevenueResponse | null;
  adminRevenueToday: AdminRevenueTodayResponse | null;
}

export const initialRevenueState: RevenuesState = {
  data: null,
  error: null,
  loading: false,
  currentRevenue: null,
  pageResponse: null,
  courtGroup: [],
  adminRevenue: null,
  adminRevenueToday: null,
};

export const revenuesReducer = createReducer(
  initialRevenueState,
  on(RevenuesActions.loadRevenues, state => ({ ...state, loading: true })),
  on(RevenuesActions.loadRevenuesSuccess, (state, { data }) => ({ ...state, data, loading: false })),
  on(RevenuesActions.loadRevenuesFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(RevenuesActions.loadCurrentRevenue, state => ({ ...state, loading: true })),
  on(RevenuesActions.loadCurrentRevenueSuccess, (state, { currentRevenue }) => ({ ...state, currentRevenue, loading: false })),
  on(RevenuesActions.loadCurrentRevenueFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(RevenuesActions.loadCourtGroupWithRevenueByOwnerId2, state => ({ ...state, loading: true })),
  on(RevenuesActions.loadCourtGroupWithRevenueByOwnerIdSuccess, (state, { pageResponse }) => ({ ...state, pageResponse, courtGroup: pageResponse.items, loading: false })),
  on(RevenuesActions.loadCourtGroupWithRevenueByOwnerIdFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(RevenuesActions.loadAllOwnerRevenueByMonth, state => ({ ...state, loading: true })),
  on(RevenuesActions.loadAllOwnerRevenueByMonthSuccess, (state, { data }) => ({ ...state, adminRevenue: data, loading: false })),
  on(RevenuesActions.loadAllOwnerRevenueByMonthFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(RevenuesActions.loadAllOwnerRevenueByToday, state => ({ ...state, loading: true })),
  on(RevenuesActions.loadAllOwnerRevenueByTodaySuccess, (state, { data }) => ({ ...state, adminRevenueToday: data, loading: false })),
  on(RevenuesActions.loadAllOwnerRevenueByTodayFailure, (state, { error }) => ({ ...state, error, loading: false })),
);
