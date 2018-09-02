import { Action } from '@ngrx/store';
import { IUser, IUserAccount } from '../../models/users/user';
import { UserLoginState } from '../reducers/userReducer';

// Login Effects
export const LOGIN = 'LOGIN';
export const LOGIN_RESPONSE = 'LOGIN_RESPONSE';
export const LOGOUT = 'LOGOUT';
export const LOGOUT_RESPONSE = 'LOGOUT_RESPONSE';
export const LOGGED_IN = 'LOGGED_IN';
export const LOGGED_OUT = 'LOGGED_OUT';

// User Effects
export const GETUSERPROFILE = 'GETUSERPROFILE';
export const GETUSER_RESPONSE = 'GETUSER_RESPONSE';
export const UPLOADAVATAR = 'UPLOADAVATAR';
export const UPLOADAVATAR_RESPONSE = 'UPLOADAVATAR_RESPONSE';

// Login Actions
export class LoginAction implements Action {
  readonly type: any = LOGIN;
  constructor(public payload: {username: string, password: string}) {}
}

export class LogoutAction implements Action {
  readonly type: any = LOGOUT;
  constructor(public payload: {id: number, token: string}) {}
}

export class LoginResponse implements Action {
  readonly type: any = LOGIN_RESPONSE;
  constructor(public payload: UserLoginState) {}
}

export class LogOutResponse implements Action {
  readonly type: any = LOGOUT_RESPONSE;
  constructor(public payload: UserLoginState) {}
}

// User Actions
export class GetUserProfileAction implements Action {
  readonly type: any = GETUSERPROFILE;
  constructor(public payload: {id: number, token: string}) {}
}

export class GetUserResponse implements Action {
  readonly type: any = GETUSER_RESPONSE;
  constructor(public payload: {success: boolean, user: IUser}) {}
}

export class UploadAvatarAction implements Action {
  readonly type: any = UPLOADAVATAR;
  constructor(public payload: {action: string, id: number, avatar: File, token: string}) {}
}

export class UploadAvatarResponse implements Action {
  readonly type: any = UPLOADAVATAR_RESPONSE;
  constructor(public payload: {success: boolean, account: IUserAccount}) {}
}

export type LOGINOUT_RESPONSE_ACTIONS =
  | LoginResponse
  | LogOutResponse;

export type USER_ACTIONS =
  | GetUserProfileAction
  | GetUserResponse
  | UploadAvatarAction
  | UploadAvatarResponse;

