import { Action, createReducer, on } from '@ngrx/store';
import * as RegisterActions from './register.actions';

export interface RegisterState {
  loading: boolean;
  error: any;
}

export const initialRegisterState: RegisterState = {
  loading: false,
  error: null,
};

export const registerReducer = createReducer(
  initialRegisterState,
  on(RegisterActions.register, state => ({ ...state, loading: true, error: null })),
  on(RegisterActions.registerSuccess, state => ({ ...state, loading: false })),
  on(RegisterActions.registerFailure, (state, { error }) => ({ ...state, loading: false, error }))
);
export function RegisterReducer(state: RegisterState | undefined, action: Action) {
  return registerReducer(state, action);
}
