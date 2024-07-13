import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from './user.service';
import {
  loadUser,
  loadUserSuccess,
  loadUserFailure,
  updateUser,
  updateUserSuccess,
  updateUserFailure,
  loadManagerByOwner,
  loadManagerByOwnerSuccess,
  loadManagerByOwnerFailure,
  deleteUser,
  deleteUserSuccess,
  deleteUserFailure,
  loadUserById,
  loadUserByIdSuccess,
  loadUserByIdFailure,
  createManager,
  createManagerSuccess, createManagerFailure, loadAllUsers, loadAllUsersSuccess
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

  loadManagersByOwner$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadManagerByOwner),
      mergeMap(action =>
        this.userService.getManagersByOwner(action.ownerId).pipe(
          map(managers => loadManagerByOwnerSuccess({ managers })),
          catchError(error => of(loadManagerByOwnerFailure({ error })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      mergeMap(action =>
        this.userService.deleteUser(action.id).pipe(
          map(() => deleteUserSuccess({ id: action.id})),
          catchError(error => of(deleteUserFailure({ error })))
        )
      )
    )
  );

  loadUserById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserById),
      mergeMap(action =>
        this.userService.getUserById(action.id).pipe(
          map(user => loadUserByIdSuccess({ user })),
          catchError(error => of(loadUserByIdFailure({ error })))
        )
      )
    )
  );

  createManager$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createManager),
      mergeMap(action =>
        this.userService.createManager(action.ownerId, action.user).pipe(
          map(user => createManagerSuccess({ user })),
          catchError(error => of(createManagerFailure({ error })))
        )
      )
    )
  );
  loadAllUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadAllUsers),
      mergeMap(action =>
        this.userService.getAllUsers(action.role).pipe(
          map(users => loadAllUsersSuccess({ users })),
          catchError(error => of(loadUserFailure({ error })))
        )
      )
    )
  );


  constructor(private actions$: Actions, private userService: UserService) {}
}
