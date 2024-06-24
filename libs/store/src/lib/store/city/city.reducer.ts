import { createReducer, on } from '@ngrx/store';
import * as CityActions from './city.actions';

export interface CityState {
  cities: string[];
  error: string | null;
}

export const initialCityState: CityState = {
  cities: [],
  error: null,
};

export const CityReducer = createReducer(
  initialCityState,
  on(CityActions.loadCitiesSuccess, (state, { cities }) => ({ ...state, cities })),
  on(CityActions.loadCitiesFailure, (state, { error }) => ({ ...state, error }))
);
