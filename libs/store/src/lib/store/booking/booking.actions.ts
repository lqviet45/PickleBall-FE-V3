import { createAction, props } from '@ngrx/store';
import { Booking } from './booking.model';
import { PagedResponse } from '../PagedResponse.model';

export const loadBookingsSuccess = createAction(
  '[Bookings] Load Bookings Success',
  props<{ pagedResponse: PagedResponse<Booking> }>()
);
export const loadBookingsByCourtGroup = createAction(
  '[Bookings] Load Bookings By Date',
  props<{ courtGroupId: string, pageNumber: number,  pageSize: number}>()
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
export const confirmBooking = createAction(
  '[Booking] Confirm Booking',
  props<{ bookingId: string; courtYardId: string; slotIds: string[]; dateBooking: string }>()
);

export const confirmBookingSuccess = createAction(
  '[Booking] Confirm Booking Success',
  props<{ response: any }>()
);

export const confirmBookingFailure = createAction(
  '[Booking] Confirm Booking Failure',
  props<{ error: any }>()
);

