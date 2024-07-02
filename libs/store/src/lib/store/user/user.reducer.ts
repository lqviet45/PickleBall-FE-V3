import { createReducer, on } from '@ngrx/store';
import {
  loadUser,
  loadUserSuccess,
  loadUserFailure,
  updateUser,
  updateUserSuccess,
  updateUserFailure,
  loadManagerByOwner,
  loadManagerByOwnerSuccess,
  loadManagerByOwnerFailure,
  deleteUserFailure,
  deleteUser,
  deleteUserSuccess,
  loadUserById,
  loadUserByIdSuccess,
  loadUserByIdFailure,
  createManager, createManagerSuccess, createManagerFailure
} from './user.actions';
import { UserInterface } from './user.interface';

export interface UserState {
  user: UserInterface | null;
  managers: UserInterface[];
  error: any;
  userAction: boolean;
}

export const userInitialState: UserState = {
  user: null,
  managers:[],
  error: null,
  userAction: false
};

const _userReducer = createReducer(
  userInitialState,
  on(loadUser, state => ({ ...state })),
  on(loadUserSuccess, (state, { user }) => ({ ...state, user })),
  on(loadUserFailure, (state, { error }) => ({ ...state, error })),
  on(updateUser, state => ({ ...state, userAction: false })),
  on(updateUserSuccess, (state, { user }) => ({ ...state, user, userAction: true })),
  on(updateUserFailure, (state, { error }) => ({ ...state, userAction: false , error })),
  on(loadManagerByOwner, state => ({ ...state })),
  on(loadManagerByOwnerSuccess, (state, { managers }) => ({ ...state, managers })),
  on(loadManagerByOwnerFailure, (state, { error }) => ({ ...state, error })),
  on(deleteUser, state => ({ ...state })),
  on(deleteUserSuccess, (state, { id }) => ({ ...state, managers: state.managers.filter(item => item.id !== id) })),
  on(deleteUserFailure, (state, { error }) => ({ ...state, error })),
  on(loadUserById, state => ({ ...state })),
  on(loadUserByIdSuccess, (state, { user }) => ({ ...state, user })),
  on(loadUserByIdFailure, (state, { error }) => ({ ...state, error })),
  on(createManager, state => ({ ...state, userAction: false })),
  on(createManagerSuccess, (state, { user }) => ({
    ...state,
    managers: [...state.managers, user],
    userAction: true
  })),
  on(createManagerFailure, (state, { error }) => ({ ...state, userAction: false, error })),
);

export function userReducer(state: UserState | undefined, action: any) {
  return _userReducer(state, action);
}
