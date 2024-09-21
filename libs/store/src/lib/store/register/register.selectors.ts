import { createFeatureSelector, createSelector } from '@ngrx/store';
import { RegisterState } from './register.reducer';

// Create a feature selector
export const selectRegisterFeature = createFeatureSelector<RegisterState>('register');

// Selector to get the error message
export const selectRegisterError = createSelector(
  selectRegisterFeature,
  (state: RegisterState) => state.error
);

// Selector to get the loading state
export const selectRegisterLoading = createSelector(
  selectRegisterFeature,
  (state: RegisterState) => state.loading
);

export const selectRegisterSuccess = createSelector(
  selectRegisterFeature,
  (state: RegisterState) => state.success  // Only return true if registration was successful
);
