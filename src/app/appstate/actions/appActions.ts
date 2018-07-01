import { Action } from '@ngrx/store';
import { IAuthUser } from '../../models/users/user';

// Effects
export const LOGINOUT = 'LOGINOUT';
export const LOGOUT = 'LOGOUT';
export const LOGIN = 'LOGIN';
export const LOGIN_RESPONSE = 'LOGIN_RESPONSE';
export const LOGOUT_RESPONSE = 'LOGOUT_RESPONSE';

// Alerts
export const ALERT = 'AlertAction';
//

export class LoginAction implements Action {
  readonly type: any = LOGINOUT;
  constructor(public payload: {action: string, username: string, password: string}) {}
}

export class LogoutAction implements Action {
  readonly type: any = LOGINOUT;
  constructor(public payload: {action: string, username: string}) {}
}

export class LoginResponse implements Action {
  readonly type: any = LOGIN_RESPONSE;
  constructor(public payload: {success: boolean, authuser: IAuthUser, token: string}) {}
}

export class LogOutResponse implements Action {
  readonly type: any = LOGOUT_RESPONSE;
  constructor(public payload: {success: boolean, authuser: string}) {}
}

export class AlertAction implements Action {
  readonly type: any = ALERT;
  constructor(public payload: {message: string}) {}
}

export type APP_ACTIONS =
  | LoginAction
  | LoginResponse
  | AlertAction;

export type LOGINOUT_ACTIONS =
  | LoginAction
  | LogoutAction;
