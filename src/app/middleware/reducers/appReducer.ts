import { empty_authuser, IAuthUser } from '../../models/users/user';
import * as appActions from '../actions/appActions';


// NOTE: this has all been moved to the userReducer as login and logout are related to the user.


// export interface  UserLoginState {
//   login_state: string;
//   success: boolean;
//   authuser: IAuthUser;
//   token: string;
// }
//
// const initialState: UserLoginState = {
//   login_state: LOGGED_OUT,
//   success: false,
//   authuser: empty_authuser,
//   token: ''
// };

// export function appReducer( state: UserLoginState = initialState, action: appActions.LOGINOUT_RESPONSE ): UserLoginState {
//   switch (action.type) {
//     case LOGINOUT_RESPONSE:
//       return {
//         ...state,
//         login_state: action.payload.login_state,
//         success: action.payload.success,
//         authuser: action.payload.authuser,
//         token: action.payload.token
//       };
//   }
//   return state;
// }
