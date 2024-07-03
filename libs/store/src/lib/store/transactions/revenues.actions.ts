import { createAction, props } from '@ngrx/store';
import { RevenueResponse } from './revenue.model';

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
