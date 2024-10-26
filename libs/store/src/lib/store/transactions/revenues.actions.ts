import { createAction, props } from '@ngrx/store';
import {
  AdminRevenueResponse,
  AdminRevenueTodayResponse,
  CurrentRevenue, OwnerRevenueResponse,
  OwnerRevenueTodayResponse,
  RevenueResponse, Transaction
} from './revenue.model';
import { PagedResponse } from '../PagedResponse.model';
import { CourtGroup } from '../court-group/court-group.model';

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

export const loadCourtGroupWithRevenueByOwnerId2 = createAction(
  '[Revenues] Load Court Group With Revenue By Owner Id',
  props<{ ownerId: string; month: string; year: string }>()
);

export const loadCourtGroupWithRevenueByOwnerIdSuccess = createAction(
  '[Revenues] Load Court Group With Revenue By Owner Id Success',
  props<{ pageResponse: PagedResponse<CourtGroup> }>()
);

export const loadCourtGroupWithRevenueByOwnerIdFailure = createAction(
  '[Revenues] Load Court Group With Revenue By Owner Id Failure',
  props<{ error: any }>()
);
export const loadAllOwnerRevenueByMonth = createAction(
  '[Revenues] Load All Owner\'s Revenue By Month',
  props<{ month: number; year: number }>()
);

export const loadAllOwnerRevenueByMonthSuccess = createAction(
  '[Revenues] Load All Owner\'s Revenue By Month Success',
  props<{ data: AdminRevenueResponse }>()
);

export const loadAllOwnerRevenueByMonthFailure = createAction(
  '[Revenues] Load All Owner\'s Revenue By Month Failure',
  props<{ error: any }>()
);
export const loadAllOwnerRevenueByToday = createAction(
  '[Revenues] Load All Owner\'s Revenue By Today',
);

export const loadAllOwnerRevenueByTodaySuccess = createAction(
  '[Revenues] Load All Owner\'s Revenue By Month Today',
  props<{ data: AdminRevenueTodayResponse }>()
);

export const loadAllOwnerRevenueByTodayFailure = createAction(
  '[Revenues] Load All Owner\'s Revenue By Today Failure',
  props<{ error: any }>()
);

export const loadOwnerTodayRevenue = createAction(
  '[Revenues] Load Owner Today Revenue',
  props<{ ownerId: string }>()
);

export const loadOwnerTodayRevenueSuccess = createAction(
  '[Revenues] Load Owner Today Revenue Success',
  props<{ data: OwnerRevenueTodayResponse }>()
);

export const loadOwnerTodayRevenueFailure = createAction(
  '[Revenues] Load Owner Today Revenue Failure',
  props<{ error: any }>()
);

export const loadSingleOwnerRevenue = createAction(
  '[Revenues] Load Single Owner Revenues',
  props<{ ownerId: string; month: string; year: string }>()
);

export const loadSingleOwnerRevenueSuccess = createAction(
  '[Revenues] Load Single Owner Revenues Success',
  props<{ data: OwnerRevenueResponse }>()
);

export const loadSingleOwnerRevenueFailure = createAction(
  '[Revenues] Load Single Owner Revenue Failure',
  props<{ error: any }>()
);
export const loadOwnerTransaction = createAction(
  '[Transaction] Load Owner Transaction',
  props<{ courtGroupId: string; pageNumber: number; pageSize: number }>()
);

export const loadOwnerTransactionSuccess = createAction(
  '[Transaction] Load Owner Transaction Success',
  props<{ data: PagedResponse<Transaction> }>()
);

export const loadOwnerTransactionFailure = createAction(
  '[Transaction] Load Owner Transaction Failure',
  props<{ error: any }>()
);
export const loadTransaction = createAction(
  '[Transaction] Load Transaction',
  props<{ pageNumber: number; pageSize: number }>()
);

export const loadTransactionSuccess = createAction(
  '[Transaction] Load Transaction Success',
  props<{ data: PagedResponse<Transaction> }>()
);

export const loadTransactionFailure = createAction(
  '[Transaction] Load Transaction Failure',
  props<{ error: any }>()
);
