import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CourtGroupService } from './court-group.services';
import * as CourtGroupActions from './court-group.action';
import { PagedResponse } from '../PagedResponse.model';
import { CourtGroup } from './court-group.model';

@Injectable()
export class CourtGroupEffects {
  constructor(
    private actions$: Actions,
    private courtGroupService: CourtGroupService
  ) {}

  loadCourtGroups$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourtGroupActions.loadCourtGroups),
      mergeMap(action =>
        this.courtGroupService.getCourtGroups(8, 1).pipe(
          map((response: PagedResponse<CourtGroup>) => CourtGroupActions.loadCourtGroupsSuccess({ pagedResponse: response })),
          catchError(error => of(CourtGroupActions.loadCourtGroupsFailure({ error })))
        )
      )
    )
  );

  loadCourtGroupByOwnerId$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourtGroupActions.loadCourtGroupByOwnerId),
      mergeMap(action =>
        this.courtGroupService.getCourtsByOwnerId(action.ownerId, action.pageNumber, action.pageSize).pipe(
          map(pagedResponse => CourtGroupActions.loadCourtGroupsSuccess({ pagedResponse })),
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
      mergeMap(({ name, cityName, pageNumber, pageSize }) =>
        this.courtGroupService.searchCourtGroups(name, cityName, pageNumber, 8).pipe(
          map(pagedResponse => CourtGroupActions.searchCourtGroupsSuccess({ pagedResponse })),
          catchError(error => of(CourtGroupActions.searchCourtGroupsFailure({ error })))
        )
      )
    )
  );

  deleteCourtGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourtGroupActions.deleteCourtGroup),
      mergeMap(action =>
        this.courtGroupService.deleteCourtGroup(action.id).pipe(
          map(() => CourtGroupActions.deleteCourtGroupSuccess({ id: action.id })),
          catchError(error => of(CourtGroupActions.deleteCourtGroupFailure({ error: error.message })))
        )
      )
    )
  );

  updateCourtGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourtGroupActions.updateCourtGroup),
      mergeMap(action =>
        this.courtGroupService.updateCourtGroup(action.courtGroup).pipe(
          map(courtGroup => CourtGroupActions.updateCourtGroupSuccess({ courtGroup })),
          catchError(error => of(CourtGroupActions.updateCourtGroupFailure({ error: error.message })))
        )
      )
    )
  );


}
