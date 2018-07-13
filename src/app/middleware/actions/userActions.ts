import { Action } from '@ngrx/store';
import { IUser } from '../../models/users/user';

// Effects
export const GETUSERPROFILE = 'GETUSERPROFILE';
export const GETUSER_RESPONSE = 'GETUSER_RESPONSE';


export class GetUserProfileAction implements Action {
  readonly type: any = GETUSERPROFILE;
  constructor(public payload: {action: string, id: number, token: string}) {}
}

export class GetUserResponse implements Action {
  readonly type: any = GETUSER_RESPONSE;
  constructor(public payload: {success: boolean, user: IUser}) {}
}

export type USER_ACTIONS =
  | GetUserProfileAction
  | GetUserResponse;

