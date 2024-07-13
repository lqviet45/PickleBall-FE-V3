import { createAction, props } from '@ngrx/store';
import { UserInterface } from './user.interface';
import { PagedResponse } from '../PagedResponse.model';
import { Booking } from '../booking/booking.model';

export const loadUser = createAction(
  '[User] Load User',
  props<{ firebaseId: string }>()
);

export const loadUserSuccess = createAction(
  '[User] Load User Success',
  props<{ user: UserInterface }>()
);

export const loadUserFailure = createAction(
  '[User] Load User Failure',
  props<{ error: any }>()
);

export const updateUser = createAction(
  '[User] Update User',
  props<{ user: UserInterface }>()
);

export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ user: UserInterface }>()
);

export const updateUserFailure = createAction(
  '[User] Update User Failure',
  props<{ error: any }>()
);

export const loadManagerByOwner = createAction(
  '[User] Load Manager By Owner',
  props<{ ownerId: string }>()
);

export const loadManagerByOwnerSuccess = createAction(
  '[User] Load Manager By Owner Success',
  props<{ managers: UserInterface[] }>()
);

export const loadManagerByOwnerFailure = createAction(
  '[User] Load Manager By Owner Failure',
  props<{ error: any }>()
);

export const deleteUser = createAction(
  '[User] Delete User',
  props<{ id: string }>()
);

export const deleteUserSuccess = createAction(
  '[User] Delete User Success',
  props<{ id: string }>()
);

export const deleteUserFailure = createAction(
  '[User] Delete User Failure',
  props<{ error: any }>()
);

export const loadUserById = createAction(
  '[User] Load User By ID',
  props<{ id: string }>()
);

export const loadUserByIdSuccess = createAction(
  '[User] Load User By ID Success',
  props<{ user: UserInterface }>()
);

export const loadUserByIdFailure = createAction(
  '[User] Load User By ID Failure',
  props<{ error: any }>()
);

export const createManager = createAction(
  '[User] Create Manager',
  props<{ ownerId: string, user: UserInterface }>()
);

export const createManagerSuccess = createAction(
  '[User] Create Manager Success',
  props<{ user: UserInterface }>()
);

export const createManagerFailure = createAction(
  '[User] Create Manager Failure',
  props<{ error: any }>()
);
export const loadAllUsers = createAction(
  '[Users] Load All Users',
  props<{ role: number }>()
);
export const loadAllUsersSuccess = createAction(
  '[Users] Load Users Success',
  props<{ users: UserInterface[] }>()
);



