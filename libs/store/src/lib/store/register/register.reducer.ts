import { Action, createReducer, on } from '@ngrx/store';
import * as RegisterActions from './register.actions';

export interface RegisterState {
  loading: boolean;
  error: string | null;
  success: boolean;  // New success flag
}

export const initialRegisterState: RegisterState = {
  loading: false,
  error: null,
  success: false,  // Initialize success as false
};

export const registerReducer = createReducer(
  initialRegisterState,
  // When registration starts, reset success and error
  on(RegisterActions.register, state => ({ ...state, loading: true, error: null, success: false })),

  // When registration is successful, set success to true
  on(RegisterActions.registerSuccess, state => ({ ...state, loading: false, success: true })),

  // When registration fails, keep success as false and set the error
  on(RegisterActions.registerFailure, (state, { error }) => ({ ...state, loading: false, error, success: false })),
  on(RegisterActions.resetRegisterState, state => ({
    ...initialRegisterState  // Reset to initial state
  }))
);
