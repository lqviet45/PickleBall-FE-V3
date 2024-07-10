import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { BookingsService } from './booking.service';
import * as bookingsActions from './booking.actions';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class BookingsEffects {
  loadBookingsByCourtGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookingsActions.loadBookingsByCourtGroup),
      mergeMap(({ courtGroupId, pageNumber, pageSize }) =>
        this.bookingsService.getBookingsByCourtGroup(courtGroupId, pageNumber, pageSize).pipe(
          map(pagedResponse => bookingsActions.loadBookingsSuccess({ pagedResponse })),
          catchError((error: HttpErrorResponse) => of(bookingsActions.loadBookingsFailure({ error: error.message })))
        )
      )
    )
  );
  cancelBooking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookingsActions.cancelBooking),
      mergeMap(({ bookingId }) =>
        this.bookingsService.cancelBooking(bookingId).pipe(
          map(() => bookingsActions.cancelBookingSuccess({ bookingId })),
          catchError((error: HttpErrorResponse) => of(bookingsActions.cancelBookingFailure({ error: error.message })))
        )
      )
    )
  );
  confirmBooking$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookingsActions.confirmBooking),
      mergeMap(action =>
        this.bookingsService.confirmBooking(action.bookingId, action.courtYardId, action.slotIds, action.dateBooking).pipe(
          map(response => bookingsActions.confirmBookingSuccess({ response })),
          catchError(error => of(bookingsActions.confirmBookingFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private bookingsService: BookingsService
  ) {}
}
