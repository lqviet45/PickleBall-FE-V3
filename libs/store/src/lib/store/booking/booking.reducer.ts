import { createReducer, on } from '@ngrx/store';
import * as fromActions from './booking.actions';
import { Booking } from './booking.model';
import { PagedResponse } from '../PagedResponse.model';

export interface BookingsState {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  pagedResponse: PagedResponse<Booking> | null;
}

export const initialBookingState: BookingsState = {
  bookings: [],
  loading: false,
  error: null,
  pagedResponse: null,
};

export const bookingsReducer = createReducer(
  initialBookingState,
  on(fromActions.loadBookingsByDate, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(fromActions.loadBookingsSuccess, (state, { pagedResponse }) => ({
    ...state,
    bookings: pagedResponse.items,
    pagedResponse,
    loading: false
  })),
  on(fromActions.loadBookingsFailure, (state, { error }) => ({
    ...state,
    bookings: [],
    error,
    loading: false
  })),
  on(fromActions.cancelBooking, state => ({
  ...state,
  loading: true,
  error: null
  })),
  on(fromActions.cancelBookingSuccess, (state, { bookingId }) => ({
    ...state,
    bookings: state.bookings.filter(booking => booking.id !== bookingId),
    loading: false
  })),
  on(fromActions.cancelBookingFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false
  }))
);
