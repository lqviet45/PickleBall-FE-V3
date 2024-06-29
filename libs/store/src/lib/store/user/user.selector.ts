import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

// Feature selector for the user state
export const selectUserState = createFeatureSelector<UserState>('user');

// Selector to get the current user
export const selectCurrentUser = createSelector(
  selectUserState,
  (state: UserState) => state.user
);

// Selector to get the user error
export const selectUserError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);

export const selectUserAction = createSelector(
  selectUserState,
  (state: UserState) => state.userAction
);
