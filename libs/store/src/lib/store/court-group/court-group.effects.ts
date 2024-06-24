import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CourtGroupService } from './court-group.services';
import * as CourtGroupActions from './court-group.action';

@Injectable()
export class CourtGroupEffects {
  constructor(
    private actions$: Actions,
    private courtGroupService: CourtGroupService
  ) {}

  loadCourtGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourtGroupActions.loadCourtGroups),
      mergeMap(() =>
        this.courtGroupService.getCourtGroups().pipe(
          map(courtGroups => CourtGroupActions.loadCourtGroupsSuccess({ courtGroups })),
          catchError(error => of(CourtGroupActions.loadCourtGroupsFailure({ error })))
        )
      )
    )
  );
}
