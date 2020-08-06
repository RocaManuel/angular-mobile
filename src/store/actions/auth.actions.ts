import { createAction, props } from '@ngrx/store';
import { RegisterParams } from '../../interfaces/auth.interfaces';

//--------------------Logins--------------------------
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

//-------------------registers------------------------

export const register = createAction(
  '[Register Page] Register',
  props<{ params: RegisterParams }>()
);
export const registerFailure = createAction(
  '[Register Page] RegisterFailure',
  props<{ error: any }>()
);
export const registerSuccess = createAction(
  '[Register Page] RegisterSucces',
  props<{ user: any }>()
);