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


  loadCourtGroupByOwnerId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourtGroupActions.loadCourtGroupByOwnerId),
      mergeMap(action =>
        this.courtGroupService.getCourtsByOwnerId(action.ownerId).pipe(
          map(courtGroups => CourtGroupActions.loadCourtGroupsSuccess({ courtGroups })),
          catchError(error => of(CourtGroupActions.loadCourtGroupsFailure({ error })))
        )
      )
    )
  );

  createCourtGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourtGroupActions.createCourtGroup),
      mergeMap(action =>
        this.courtGroupService.createCourtGroup(action.courtGroup).pipe(
          map(courtGroup => CourtGroupActions.createCourtGroupSuccess({ courtGroup })),
          catchError(error => of(CourtGroupActions.createCourtGroupFailure({ error })))
        )
      )
    )
  );

  searchCourtGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourtGroupActions.searchCourtGroups),
      mergeMap(({ name, cityName }) =>
        this.courtGroupService.searchCourtGroups(name, cityName).pipe(
          map(courtGroups => CourtGroupActions.searchCourtGroupsSuccess({ courtGroups })),
          catchError(error => of(CourtGroupActions.searchCourtGroupsFailure({ error })))
        )
      )
    )
  );
}
