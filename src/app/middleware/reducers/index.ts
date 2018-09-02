// import { appReducer, AppReducerState } from './appReducer';
import { loginReducer, UserLoginState , userReducer , UserReducerState } from './userReducer';
import { ActionReducerMap } from '@ngrx/store';
import { FileUploadState, FileProgressState, fileUploadReducer, fileProgressReducer, } from './fileReducer'; // notice

export interface AppState {
  // appReducer: AppReducerState;
  loginReducer: UserLoginState;
  userReducer: UserReducerState;
  fileUploadReducer: FileUploadState;
  fileProgressReducer: FileProgressState;
}

export const reducers: ActionReducerMap<AppState> = {
  // appReducer: appReducer,
  loginReducer: loginReducer,
  userReducer: userReducer,
  fileUploadReducer: fileUploadReducer,
  fileProgressReducer: fileProgressReducer,
};
