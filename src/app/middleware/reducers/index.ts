import { appReducer, AppReducerState } from './appReducer';
import { userReducer, UserReducerState } from './userReducer';
import { ActionReducerMap } from '@ngrx/store';
import { FileReducerState, FileProgressState, fileReducer, fileProgressReducer } from './fileReducer'; // notice

export interface AppState {
  appReducer: AppReducerState;
  userReducer: UserReducerState;
  fileReducer: FileReducerState;
  fileProgressReducer: FileProgressState;
}

// export interface UserState {
//   userReducer: UserReducerState;
// }

export const reducers: ActionReducerMap<AppState> = {
  appReducer: appReducer,
  userReducer: userReducer,
  fileReducer: fileReducer,
  fileProgressReducer: fileProgressReducer
};

// export const userReducers: ActionReducerMap<UserState> = {
//   userReducer: userReducer
// };
