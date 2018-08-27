import { GETUSER_RESPONSE } from '../actions/userActions';
import { empty_user, init_account, IUser, IUserAccount } from '../../models/users/user';
import * as userActions from '../actions/userActions';
import { UPLOADAVATAR_RESPONSE } from '../actions/userActions';

export interface  UserReducerState {
  user: IUser;
}

const initialState: UserReducerState = {
  user: empty_user
  };

export interface AccountReducerState {
  account: IUserAccount;
}

const initialAccountState: AccountReducerState = {
  account: init_account
};

export function userReducer( state: UserReducerState = initialState, action: userActions.GetUserResponse ): UserReducerState {
  switch (action.type) {
    case GETUSER_RESPONSE:
      return {
        ...state,
        user: action.payload.user,
      };
  }
  return state;
}

export function accountReducer( state: AccountReducerState = initialAccountState,
                                     action: userActions.UploadAvatarResponse ): AccountReducerState {
  switch (action.type) {
    case UPLOADAVATAR_RESPONSE:
      if (action.payload.success) {
        return {
          ...state,
          account: action.payload.account
        };
      }
  }
  return state;
}
