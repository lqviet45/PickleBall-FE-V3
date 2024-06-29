import { createAction, props } from '@ngrx/store';
import { UserInterface } from './user.interface';

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
