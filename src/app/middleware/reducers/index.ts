import { appReducer, AppReducerState } from './appReducer';
import { userReducer, UserReducerState } from './userReducer';
import { ActionReducerMap } from '@ngrx/store';
import { FileUploadState, FileProgressState, fileUploadReducer, fileProgressReducer } from './fileReducer'; // notice

export interface AppState {
  appReducer: AppReducerState;
  userReducer: UserReducerState;
  fileUploadReducer: FileUploadState;
  fileProgressReducer: FileProgressState;
}

export const reducers: ActionReducerMap<AppState> = {
  appReducer: appReducer,
  userReducer: userReducer,
  fileUploadReducer: fileUploadReducer,
  fileProgressReducer: fileProgressReducer
};
