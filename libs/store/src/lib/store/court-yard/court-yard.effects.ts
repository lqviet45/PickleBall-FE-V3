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

  constructor(
    private actions$: Actions,
    private courtYardService: CourtYardService
  ) {}
}
