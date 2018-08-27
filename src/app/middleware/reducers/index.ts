import { appReducer, AppReducerState } from './appReducer';
import { accountReducer, AccountReducerState, userReducer, UserReducerState } from './userReducer';
import { ActionReducerMap } from '@ngrx/store';
import { FileUploadState, FileProgressState, fileUploadReducer, fileProgressReducer, } from './fileReducer'; // notice

export interface AppState {
  appReducer: AppReducerState;
  userReducer: UserReducerState;
  accountReducer: AccountReducerState;
  fileUploadReducer: FileUploadState;
  fileProgressReducer: FileProgressState;
}

export const reducers: ActionReducerMap<AppState> = {
  appReducer: appReducer,
  userReducer: userReducer,
  accountReducer: accountReducer,
  fileUploadReducer: fileUploadReducer,
  fileProgressReducer: fileProgressReducer,
};
