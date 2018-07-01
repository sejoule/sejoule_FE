import { reducer, AppReducerState } from './appReducer';
import { userReducer, UserReducerState } from './userReducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  appReducer: AppReducerState;
}

export interface UserState {
  userReducer: UserReducerState;
}

export const reducers: ActionReducerMap<AppState> = {
  appReducer: reducer
};

export const userReducers: ActionReducerMap<UserState> = {
  userReducer: userReducer
};
