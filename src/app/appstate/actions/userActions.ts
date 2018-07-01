import { Action } from '@ngrx/store';
import { IUser } from '../../models/users/user';

// Effects
export const GETUSER = 'GETUSER';
export const GETUSER_RESPONSE = 'GETUSER_RESPONSE';


export class GetUserAction implements Action {
  readonly type: any = GETUSER;
  constructor(public payload: {action: string, id: number, token: string}) {}
}

export class GetUserResponse implements Action {
  readonly type: any = GETUSER_RESPONSE;
  constructor(public payload: {success: boolean, user: IUser}) {}
}

export type USER_ACTIONS =
  | GetUserAction
  | GetUserResponse;

