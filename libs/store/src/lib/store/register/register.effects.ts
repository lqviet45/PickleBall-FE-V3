import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as RegisterActions from './register.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthService } from '../authen/auth.service';

@Injectable()
export class RegisterEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(RegisterActions.register),
      mergeMap(action =>
        this.authService.register(action.email, action.password, action.firstName, action.lastName, action.fullName, action.location, action.role).pipe(
          map(() => {
            console.log('User registration successful');
            return RegisterActions.registerSuccess();
          }),
          catchError(error => {
            console.error('User registration failed', error);
            return of(RegisterActions.registerFailure({ error }));
          })
        )
      )
    )
  );
}
