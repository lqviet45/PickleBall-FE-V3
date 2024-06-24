import { createReducer, on } from '@ngrx/store';
import { loadUser, loadUserSuccess, loadUserFailure } from './user.actions';
import { UserInterface } from './user.interface';

export interface UserState {
  user: UserInterface | null;
  error: any;
}

export const initialState: UserState = {
  user: null,
  error: null,
};

const _userReducer = createReducer(
  initialState,
  on(loadUser, state => ({ ...state })),
  on(loadUserSuccess, (state, { user }) => ({ ...state, user })),
  on(loadUserFailure, (state, { error }) => ({ ...state, error }))
);

export function userReducer(state: UserState | undefined, action: any) {
  return _userReducer(state, action);
}
