import { createReducer, on } from '@ngrx/store';
import * as RevenuesActions from './revenues.actions';
import {
  AdminRevenueResponse,
  AdminRevenueTodayResponse,
  CurrentRevenue, OwnerRevenueResponse,
  OwnerRevenueTodayResponse,
  RevenueResponse, Transaction
} from './revenue.model';
import { PagedResponse } from '../PagedResponse.model';
import { CourtGroup } from '../court-group/court-group.model';
import { PageEvent } from '@angular/material/paginator';
import * as fromActions from '../booking/booking.actions';

export interface RevenuesState {
  data: RevenueResponse | null;
  error: any;
  loading: boolean;
  currentRevenue: CurrentRevenue | null;
  pageResponse: PagedResponse<CourtGroup> | null;
  courtGroup: CourtGroup[];
  adminRevenue: AdminRevenueResponse | null;
  adminRevenueToday: AdminRevenueTodayResponse | null;
  ownerRevenueToday: OwnerRevenueTodayResponse | null;
  ownerRevenue: OwnerRevenueResponse | null;
  transactionPageResponse: PagedResponse<Transaction> | null
  transaction: Transaction[]
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
  ownerRevenueToday: null,
  ownerRevenue: null,
  transaction: [],
  transactionPageResponse: null
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
  on(RevenuesActions.loadOwnerTodayRevenue, state => ({ ...state, loading: true })),
  on(RevenuesActions.loadOwnerTodayRevenueSuccess, (state, { data }) => ({ ...state, ownerRevenueToday: data, loading: false })),
  on(RevenuesActions.loadOwnerTodayRevenueFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(RevenuesActions.loadSingleOwnerRevenue, state => ({ ...state, loading: true })),
  on(RevenuesActions.loadSingleOwnerRevenueSuccess, (state, { data }) => ({ ...state, ownerRevenue: data, loading: false })),
  on(RevenuesActions.loadSingleOwnerRevenueFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(RevenuesActions.loadOwnerTransaction, state => ({ ...state, loading: true })),
  on(RevenuesActions.loadOwnerTransactionSuccess, (state, { data }) => ({
    ...state,
    transaction: data.items,
    loading: false
  })),
  on(RevenuesActions.loadOwnerTransactionFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(RevenuesActions.loadTransaction, state => ({ ...state, loading: true })),
  on(RevenuesActions.loadTransactionSuccess, (state, { data }) => ({
    ...state,
    transaction: data.items,
    loading: false
  })),
  on(RevenuesActions.loadTransactionFailure, (state, { error }) => ({ ...state, error, loading: false })),
);
