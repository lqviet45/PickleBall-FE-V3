import { createAction, props } from '@ngrx/store';
import { CurrentRevenue, RevenueResponse } from './revenue.model';

export const loadRevenues = createAction(
  '[Revenues] Load Revenues',
  props<{ ownerId: string; month: string; year: string }>()
);

export const loadRevenuesSuccess = createAction(
  '[Revenues] Load Revenues Success',
  props<{ data: RevenueResponse }>()
);

export const loadRevenuesFailure = createAction(
  '[Revenues] Load Revenues Failure',
  props<{ error: any }>()
);

export const loadCurrentRevenue = createAction(
  '[Revenues] Load Current Revenue',
  props<{ ownerId: string }>()
);

export const loadCurrentRevenueSuccess = createAction(
  '[Revenues] Load Current Revenue Success',
  props<{ currentRevenue: CurrentRevenue }>()
);

export const loadCurrentRevenueFailure = createAction(
  '[Revenues] Load Current Revenue Failure',
  props<{ error: any }>()
);
