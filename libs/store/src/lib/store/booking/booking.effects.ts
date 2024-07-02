import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { BookingsService } from './booking.service';
import * as bookingsActions from './booking.actions';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class BookingsEffects {
  loadBookings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(bookingsActions.loadBookings),
      mergeMap(({ date }) =>
        this.bookingsService.getBookingsByDate(date).pipe(
          map(bookings => bookingsActions.loadBookingsSuccess({ bookings })), // Access value from API response
          catchError((error: HttpErrorResponse) => {
            if (error.status === 404) {
              return of(bookingsActions.loadBookingsFailure({ error: 'No bookings found for the selected date.' }));
            }
            return of(bookingsActions.loadBookingsFailure({ error: 'An error occurred while loading bookings.' }));
          })
        )
      )
    ));
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

  constructor(
    private actions$: Actions,
    private bookingsService: BookingsService
  ) {}
}
