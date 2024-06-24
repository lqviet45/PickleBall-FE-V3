import { createReducer, on } from '@ngrx/store';
import * as fromActions from './booking.actions';
import { Booking } from './booking.model';

export interface BookingsState {
  bookings: Booking[];
  loading: boolean;
  error: any;
}

export const initialBookingState: BookingsState = {
  bookings: [],
  loading: false,
  error: null
};

export const bookingsReducer = createReducer(
  initialBookingState,
  on(fromActions.loadBookings, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(fromActions.loadBookingsSuccess, (state, { bookings }) => ({
    ...state,
    bookings,
    loading: false
  })),
  on(fromActions.loadBookingsFailure, (state, { error }) => ({
    ...state,
    bookings: [],
    error,
    loading: false
  }))
);
