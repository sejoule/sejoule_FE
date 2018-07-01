import { LOGIN_RESPONSE, LOGOUT_RESPONSE } from '../actions/appActions';
import { empty_authuser, IAuthUser } from '../../models/users/user';

export interface  AppReducerState {
  login_state: boolean;
  authuser: IAuthUser;
  token: string;
}

const initialState: AppReducerState = {
  login_state: false,
  authuser: empty_authuser,
  token: ''
};

export function reducer( state: AppReducerState = initialState, action: any ): AppReducerState {
  switch (action.type) {
    case LOGIN_RESPONSE:
      return {
        ...state,
        login_state: state.login_state ? state.login_state : action.payload.success,
        authuser: action.payload.authuser,
        token: action.payload.token
      };
    case LOGOUT_RESPONSE:
      return {
        ...state,
        login_state: !state.login_state ? state.login_state : !action.payload.success,
        authuser: action.payload.authuser,
        token: action.payload.token
      };
  }
  return state;
}
