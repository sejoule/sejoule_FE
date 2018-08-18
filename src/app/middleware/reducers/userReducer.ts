import { GETUSER_RESPONSE } from '../actions/userActions';
import { empty_user, IUser } from '../../models/users/user';
import * as userActions from '../actions/userActions';

export interface  UserReducerState {
  user: IUser;
}

const initialState: UserReducerState = {
  user: empty_user
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
