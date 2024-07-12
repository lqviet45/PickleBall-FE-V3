import { createReducer, on } from '@ngrx/store';
import * as RevenuesActions from './revenues.actions';
import { CurrentRevenue, RevenueResponse } from './revenue.model';

export interface RevenuesState {
  data: RevenueResponse | null;
  error: any;
  loading: boolean;
  currentRevenue: CurrentRevenue | null;
}

export const initialRevenueState: RevenuesState = {
  data: null,
  error: null,
  loading: false,
  currentRevenue: null
};

export const revenuesReducer = createReducer(
  initialRevenueState,
  on(RevenuesActions.loadRevenues, state => ({ ...state, loading: true })),
  on(RevenuesActions.loadRevenuesSuccess, (state, { data }) => ({ ...state, data, loading: false })),
  on(RevenuesActions.loadRevenuesFailure, (state, { error }) => ({ ...state, error, loading: false })),
  on(RevenuesActions.loadCurrentRevenue, state => ({ ...state, loading: true })),
  on(RevenuesActions.loadCurrentRevenueSuccess, (state, { currentRevenue }) => ({ ...state, currentRevenue, loading: false })),
  on(RevenuesActions.loadCurrentRevenueFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
