import { Injectable } from '@angular/core';
import { createEffect, ofType, Actions } from '@ngrx/effects';
import { AuthActions } from '../actions';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {

login$ = createEffect(
  () =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ email, password }) =>
        this.authService.auth({ email, password }).pipe(
          map(({ response }) => {
            this.router.navigate(['/']);
            return AuthActions.loginSuccess({ user: response });
          }),
          catchError(error => of(AuthActions.loginFailure({ error })))
        )
      )
    )
);

register$ = createEffect(
  () =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      mergeMap(({ params: { country, location , name, lastname, email, password } }) =>
        this.authService.authRegister({ country, location, name, lastname, email, password }).pipe(
          map(({ response }) => {
            this.router.navigate(['/']);
            return AuthActions.registerSuccess({ user: response });
          }),
          catchError(error => of(AuthActions.registerFailure({ error })))
        )
      )
    )
);



constructor(
  private actions$: Actions,
  private authService: AuthService,
  private router: Router
) { }
}