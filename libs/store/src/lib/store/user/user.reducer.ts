import { createReducer, on } from '@ngrx/store';
import {
  loadUser,
  loadUserSuccess,
  loadUserFailure,
  updateUser,
  updateUserSuccess,
  updateUserFailure
} from './user.actions';
import { UserInterface } from './user.interface';

export interface UserState {
  user: UserInterface | null;
  error: any;
  userAction: boolean;
}

export const userInitialState: UserState = {
  user: null,
  error: null,
  userAction: false
};

const _userReducer = createReducer(
  userInitialState,
  on(loadUser, state => ({ ...state })),
  on(loadUserSuccess, (state, { user }) => ({ ...state, user })),
  on(loadUserFailure, (state, { error }) => ({ ...state, error })),
  on(updateUser, state => ({ ...state })),
  on(updateUserSuccess, (state, { user }) => ({ ...state, user, userAction: true })),
  on(updateUserFailure, (state, { error }) => ({ ...state, userAction: false , error })),
);

export function userReducer(state: UserState | undefined, action: any) {
  return _userReducer(state, action);
}
