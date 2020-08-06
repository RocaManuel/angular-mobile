import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { AuthActions } from '../actions';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {

login$ = createEffect(
  () =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password }) =>
        this.authService.auth({ email, password }).pipe(
          map(user => AuthActions.loginSuccess({ user })),
          catchError(error => of(AuthActions.loginFailure({ error })))
        )
      )
    )
);

constructor(
  private actions$: Actions,
  private authService: AuthService
) { }
}