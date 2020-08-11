import { Action, createReducer, on } from '@ngrx/store';
import {AuthActions} from "../actions";

export interface State {
  user : any;
  error : any;
  pending : boolean;
}

export const initialState: State = {
    user : null,
    error : null,
    pending : false,
  };

const userReducer = createReducer(
    initialState,
    on(AuthActions.login, state => ({ ...state, pending : true })),
    on(AuthActions.register, state => ({ ...state, pending : true })),
    on(AuthActions.loginSuccess, (state, {user}) => ({ ...state, pending : false, user })),
    on(AuthActions.registerSuccess, (state, {user}) => ({ ...state, pending : false, user })),
    on(AuthActions.loginFailure, (state, {error}) => ({ ...state, pending : false, error }))
  );
  
  export function reducer(state: State | undefined, action: Action) {
    return userReducer(state, action);
  }