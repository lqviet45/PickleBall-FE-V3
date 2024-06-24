import { createAction, props } from '@ngrx/store';
import { Booking } from './booking.model';

export const loadBookings = createAction(
  '[Bookings] Load Bookings',
  props<{ date: string }>()
);

export const loadBookingsSuccess = createAction(
  '[Bookings] Load Bookings Success',
  props<{ bookings: Booking[] }>()
);

export const loadBookingsFailure = createAction(
  '[Bookings] Load Bookings Failure',
  props<{ error: any }>()
);
