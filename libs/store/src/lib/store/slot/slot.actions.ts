import { createAction, props } from '@ngrx/store';
import { Slots } from './slot.model'; // Import the Slot model interface

export const loadSlots = createAction(
  '[Slots] Load Slots',
  props<{ courtYardId: string, dateBooking: string }>()
);

export const loadSlotsSuccess = createAction(
  '[Slots] Load Slots Success',
  props<{ slots: Slots[] }>()
);

export const loadSlotsFailure = createAction(
  '[Slots] Load Slots Failure',
  props<{ error: any }>()
);
