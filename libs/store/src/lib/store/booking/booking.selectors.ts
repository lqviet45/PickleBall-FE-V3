import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookingsState } from './booking.reducer';

export const selectBookingsState = createFeatureSelector<BookingsState>('bookings');

export const selectBookings = createSelector(
  selectBookingsState,
  (state: BookingsState) => state.bookings
);

export const selectBookingsError = createSelector(
  selectBookingsState,
  (state: BookingsState) => state.error
);
