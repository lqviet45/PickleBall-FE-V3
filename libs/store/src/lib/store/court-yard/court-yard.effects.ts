// court-yard.effects.ts
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CourtYardService } from './court-yard.services';
import * as CourtYardActions from './court-yard.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class CourtYardEffects {
  loadCourtYards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourtYardActions.loadCourtYards),
      mergeMap(action =>
        this.courtYardService.getAllCourtYardsByCourtGroupId(action.courtGroupId).pipe(
          map(courtYards => CourtYardActions.loadCourtYardsSuccess({ courtYards })),
          catchError(error => of(CourtYardActions.loadCourtYardsFailure({ error: error.message })))
        )
      )
    )
  );

  createCourtYard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourtYardActions.createCourtYard),
      mergeMap(action =>
        this.courtYardService.createCourtYard(action.courtGroupId, action.courtYardName).pipe(
          map(courtYard => CourtYardActions.createCourtYardSuccess({ courtYard })),
          catchError(error => of(CourtYardActions.createCourtYardFailure({ error: error.message })))
        )
      )
    )
  );

  updateCourtYard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourtYardActions.updateCourtYard),
      mergeMap(action =>
        this.courtYardService.updateCourtYard(action.courtYard).pipe(
          map(courtYard => CourtYardActions.updateCourtYardSuccess({ courtYard })),
          catchError(error => of(CourtYardActions.updateCourtYardFailure({ error: error.message })))
        )
      )
    )
  );

  deleteCourtYard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourtYardActions.deleteCourtYard),
      mergeMap(action =>
        this.courtYardService.deleteCourtYard(action.id).pipe(
          map(() => CourtYardActions.deleteCourtYardSuccess({ id: action.id })),
          catchError(error => of(CourtYardActions.deleteCourtYardFailure({ error: error.message })))
        )
      )
    )
  );


  constructor(
    private actions$: Actions,
    private courtYardService: CourtYardService
  ) {}
}
