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
          map(() => RegisterActions.registerSuccess()),  // Dispatch success action
          catchError(error => {
            const errorMessage = this.getErrorMessage(error);
            return of(RegisterActions.registerFailure({ error: errorMessage }));  // Dispatch failure action
          })
        )
      )
    )
  );

  private getErrorMessage(error: any): string {
    if (error?.error?.error?.message === 'EMAIL_EXISTS') {
      return 'The email address is already in use by another account.';
    }
    return 'The email address is already in use by another account.';
  }
}
