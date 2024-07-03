import { createReducer, on } from '@ngrx/store';
import * as RevenuesActions from './revenues.actions';
import { RevenueResponse } from './revenue.model';

export interface RevenuesState {
  data: RevenueResponse | null;
  error: any;
  loading: boolean;
}

export const initialState: RevenuesState = {
  data: null,
  error: null,
  loading: false
};

export const revenuesReducer = createReducer(
  initialState,
  on(RevenuesActions.loadRevenues, state => ({ ...state, loading: true })),
  on(RevenuesActions.loadRevenuesSuccess, (state, { data }) => ({ ...state, data, loading: false })),
  on(RevenuesActions.loadRevenuesFailure, (state, { error }) => ({ ...state, error, loading: false }))
);
