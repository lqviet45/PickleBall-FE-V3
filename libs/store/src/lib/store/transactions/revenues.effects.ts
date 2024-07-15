import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RevenuesService } from './revenues.service';
import * as RevenuesActions from './revenues.actions';
import { CurrentRevenue, RevenueResponse } from './revenue.model';
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

  constructor(
    private actions$: Actions,
    private revenuesService: RevenuesService,
    private courtGroupService: CourtGroupService
  ) {}
}
