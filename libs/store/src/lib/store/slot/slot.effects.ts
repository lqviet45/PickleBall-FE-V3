import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { SlotsService } from './slot.service'; // Adjust path as per your project structure
import * as SlotsActions from './slot.actions';

@Injectable()
export class SlotsEffects {

  loadSlots$ = createEffect(() => this.actions$.pipe(
    ofType(SlotsActions.loadSlots),
    mergeMap(action =>
      this.slotsService.getSlots(action.courtYardId, action.dateBooking).pipe(
        map(slots => SlotsActions.loadSlotsSuccess({ slots })),
        catchError(error => of(SlotsActions.loadSlotsFailure({ error })))
      )
    )
  ));

  constructor(
    private actions$: Actions,
    private slotsService: SlotsService // Adjust as per your project structure
  ) {}
}
