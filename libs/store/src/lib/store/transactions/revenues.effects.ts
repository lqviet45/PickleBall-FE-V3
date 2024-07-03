import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { RevenuesService } from './revenues.service';
import * as RevenuesActions from './revenues.actions';
import { RevenueResponse } from './revenue.model';

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

  constructor(
    private actions$: Actions,
    private revenuesService: RevenuesService
  ) {}
}
