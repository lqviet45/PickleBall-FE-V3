import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as CityActions from './city.actions';

@Injectable()
export class CityEffects {
  constructor(private actions$: Actions, private http: HttpClient) {}

  loadCities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CityActions.loadCities),
      mergeMap(() =>
        this.http.get<{ value: { name: string }[] }>('https://pickleballapp.azurewebsites.net/api/cities').pipe(
          map(response => response.value.map(city => city.name)),
          map(cities => CityActions.loadCitiesSuccess({ cities })),
          catchError(error => {
            console.error('Error fetching cities:', error);
            return of(CityActions.loadCitiesFailure({ error }));
          })
        )
      )
    )
  );
}
