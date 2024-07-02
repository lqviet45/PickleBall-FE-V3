import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from './user.service';
import {
  loadUser,
  loadUserSuccess,
  loadUserFailure,
  updateUser,
  updateUserSuccess,
  updateUserFailure
} from './user.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class UserEffects {
  loadUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUser),
      mergeMap(action =>
        this.userService.getUserProfile(action.firebaseId).pipe(
          map(user => loadUserSuccess({ user })),
          catchError(error => of(loadUserFailure({ error })))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      mergeMap(action =>
        this.userService.updateUserProfile(action.user).pipe(
          map(user => updateUserSuccess({ user })),
          catchError(error => of(updateUserFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private userService: UserService) {}
}
