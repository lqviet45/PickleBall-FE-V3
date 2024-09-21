import { createAction, props } from '@ngrx/store';

export const register = createAction(
  '[Auth] Register',
  props<{ email: string, password: string, firstName: string, lastName: string, fullName: string, location: string, role: number}>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success'
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: any }>()
);
export const resetRegisterState = createAction('[Auth] Reset Register State');

