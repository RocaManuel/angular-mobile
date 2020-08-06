import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Login Page] Login',
  props<{ email: string; password: string }>()
);


export const loginFailure = createAction(
  '[Login Page] LoginFailure',
  props<{ error: any }>()
);


export const loginSuccess = createAction(
  '[Login Page] LoginSuccess',
  props<{ user : any ; }>()
);