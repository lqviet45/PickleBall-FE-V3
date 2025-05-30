import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RevenuesService } from './revenues.service';
import * as RevenuesActions from './revenues.actions';
import {
  AdminRevenueResponse,
  AdminRevenueTodayResponse,
  CurrentRevenue, OwnerRevenueResponse,
  OwnerRevenueTodayResponse,
  RevenueResponse, Transaction
} from './revenue.model';
import { CourtGroupService } from '../court-group/court-group.services';
import { PagedResponse } from '../PagedResponse.model';

@Injectable()
export class RevenuesEffects {

  loadRevenues$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RevenuesActions.loadRevenues),
      mergeMap(action =>
        this.revenuesService.getRevenues(action.ownerId, action.month, action.year).pipe(
          map((data: RevenueResponse) => RevenuesActions.loadRevenuesSuccess({ data })),
          catchError(error => of(RevenuesActions.loadRevenuesFailure({ error })))
        )
      )
    )
  );

  loadCurrentMonthRevenues$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RevenuesActions.loadCurrentRevenue),
      mergeMap(action =>
        this.revenuesService.getCurentMonthRevenues(action.ownerId).pipe(
          map((currentRevenue: CurrentRevenue) => RevenuesActions.loadCurrentRevenueSuccess({ currentRevenue })),
          catchError(error => of(RevenuesActions.loadRevenuesFailure({ error })))
        )
      )
    )
  );

  loadCourtGroupMonthRevenues$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RevenuesActions.loadCourtGroupWithRevenueByOwnerId2),
      mergeMap(action =>
        this.courtGroupService.getCourtGroupWithRevenueByOwnerId(action.ownerId, action.month, action.year).pipe(
          map((pageResponse) => RevenuesActions.loadCourtGroupWithRevenueByOwnerIdSuccess({ pageResponse })),
          catchError(error => of(RevenuesActions.loadCourtGroupWithRevenueByOwnerIdFailure({ error })))
        )
      )
    )
  );
  loadAllOwnerRevenueByMonth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RevenuesActions.loadAllOwnerRevenueByMonth),
      mergeMap(action =>
        this.revenuesService.getAllOwnerRevenueByMonth(action.month, action.year).pipe(
          map((data: AdminRevenueResponse) => RevenuesActions.loadAllOwnerRevenueByMonthSuccess({ data })),
          catchError(error => of(RevenuesActions.loadAllOwnerRevenueByMonthFailure({ error })))
        )
      )
    )
  );
  loadAllOwnerRevenueByToday$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RevenuesActions.loadAllOwnerRevenueByToday),
      mergeMap(() =>
        this.revenuesService.getAllOwnerRevenueByToday().pipe(
          map((data: AdminRevenueTodayResponse) => RevenuesActions.loadAllOwnerRevenueByTodaySuccess({ data })),
          catchError(error => of(RevenuesActions.loadAllOwnerRevenueByTodayFailure({ error })))
        )
      )
    )
  );

  loadOwnerRevenuesToday$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RevenuesActions.loadOwnerTodayRevenue),
      mergeMap(action =>
        this.revenuesService.getOwnerRevenuesToday(action.ownerId).pipe(
          map((data: OwnerRevenueTodayResponse) => RevenuesActions.loadOwnerTodayRevenueSuccess({ data })),
          catchError(error => of(RevenuesActions.loadOwnerTodayRevenueFailure({ error })))
        )
      )
    )
  );

  loadSingleOwnerRevenues$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RevenuesActions.loadSingleOwnerRevenue),
      mergeMap(action =>
        this.revenuesService.getOwnerMonthlyRevenuesV2(action.ownerId, action.month, action.year).pipe(
          map((data: OwnerRevenueResponse) => RevenuesActions.loadSingleOwnerRevenueSuccess({ data })),
          catchError(error => of(RevenuesActions.loadSingleOwnerRevenueFailure({ error })))
        )
      )
    )
  );
  loadOwnerTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RevenuesActions.loadOwnerTransaction),
      mergeMap(action =>
        this.revenuesService.getTransactionByCourtGroupId(action.courtGroupId, action.pageNumber, action.pageSize).pipe(
          map((data: PagedResponse<Transaction>) => RevenuesActions.loadOwnerTransactionSuccess({ data })),
          catchError(error => of(RevenuesActions.loadOwnerTransactionFailure({ error })))
        )
      )
    )
  );
  loadTransaction$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RevenuesActions.loadTransaction),
      mergeMap(action =>
        this.revenuesService.getTransaction(action.pageNumber, action.pageSize).pipe(
          map((data: PagedResponse<Transaction>) => RevenuesActions.loadOwnerTransactionSuccess({ data })),
          catchError(error => of(RevenuesActions.loadOwnerTransactionFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private revenuesService: RevenuesService,
    private courtGroupService: CourtGroupService
  ) {}
}
