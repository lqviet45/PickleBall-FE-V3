import { createAction, props } from '@ngrx/store';

export const loadCities = createAction('[City] Load Cities');
export const loadCitiesSuccess = createAction('[City] Load Cities Success', props<{ cities: string[] }>());
export const loadCitiesFailure = createAction('[City] Load Cities Failure', props<{ error: any }>());
