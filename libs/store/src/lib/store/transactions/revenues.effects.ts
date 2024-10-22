import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RevenuesService } from './revenues.service';
import * as RevenuesActions from './revenues.actions';
import { AdminRevenueResponse, AdminRevenueTodayResponse, CurrentRevenue, RevenueResponse } from './revenue.model';
import { CourtGroupService } from '../court-group/court-group.services';

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

  constructor(
    private actions$: Actions,
    private revenuesService: RevenuesService,
    private courtGroupService: CourtGroupService
  ) {}
}
