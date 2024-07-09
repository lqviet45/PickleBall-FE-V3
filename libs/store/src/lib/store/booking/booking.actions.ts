import { createAction, props } from '@ngrx/store';
import { Booking } from './booking.model';
import { PagedResponse } from '../PagedResponse.model';

export const loadBookingsSuccess = createAction(
  '[Bookings] Load Bookings Success',
  props<{ pagedResponse: PagedResponse<Booking> }>()
);
export const loadBookingsByDate = createAction(
  '[Bookings] Load Bookings By Date',
  props<{ courtGroupId: string, date: string, pageNumber: number,  pageSize: number}>()
);

export const loadBookingsFailure = createAction(
  '[Bookings] Load Bookings Failure',
  props<{ error: any }>()
);
export const cancelBooking = createAction(
  '[Bookings] Cancel Booking',
  props<{ bookingId: string }>()
);

export const cancelBookingSuccess = createAction(
  '[Bookings] Cancel Booking Success',
  props<{ bookingId: string }>()
);

export const cancelBookingFailure = createAction(
  '[Bookings] Cancel Booking Failure',
  props<{ error: any }>()
);

