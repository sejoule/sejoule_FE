import {GETUSER_RESPONSE , LOGIN_RESPONSE , LOGOUT_RESPONSE } from '../actions/userActions';
import { empty_authuser , empty_user , IAuthUser , IUser } from '../../models/users/user';
import * as userActions from '../actions/userActions';
import { LOGGED_OUT } from '../actions/userActions';

export interface  UserLoginState {
  login_state: string;
  success: boolean;
  authuser: IAuthUser;
}

const initialLoginState: UserLoginState = {
  login_state: LOGGED_OUT,
  success: false,
  authuser: empty_authuser
};

export interface  UserReducerState {
  user: IUser;
}

const initialUserState: UserReducerState = {
  user: empty_user
  };

export function userReducer( state: UserReducerState = initialUserState, action: userActions.GetUserResponse ): UserReducerState {
  switch (action.type) {
    case GETUSER_RESPONSE:
      return {
        ...state,
        user: action.payload.user,
      };
  }
  return state;
}

export function loginReducer( state: UserLoginState = initialLoginState, action: userActions.LOGINOUT_RESPONSE_ACTIONS ): UserLoginState {
  switch (action.type) {
    case LOGIN_RESPONSE:
    case LOGOUT_RESPONSE:
      return {
        ...state,
        login_state: action.payload.login_state,
        success: action.payload.success,
        authuser: action.payload.authuser
      };
  }
  return state;
}
