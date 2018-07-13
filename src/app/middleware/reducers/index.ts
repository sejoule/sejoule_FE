import { appReducer, AppReducerState } from './appReducer';
import { userReducer, UserReducerState } from './userReducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  appReducer: AppReducerState;
  userReducer: UserReducerState;
}

// export interface UserState {
//   userReducer: UserReducerState;
// }

export const reducers: ActionReducerMap<AppState> = {
  appReducer: appReducer,
  userReducer: userReducer
};

// export const userReducers: ActionReducerMap<UserState> = {
//   userReducer: userReducer
// };
