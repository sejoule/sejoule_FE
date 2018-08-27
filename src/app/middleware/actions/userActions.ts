import { Action } from '@ngrx/store';
import { IUser, IUserAccount } from '../../models/users/user';

// Effects
export const GETUSERPROFILE = 'GETUSERPROFILE';
export const GETUSER_RESPONSE = 'GETUSER_RESPONSE';
export const UPLOADAVATAR = 'UPLOADAVATAR';
export const UPLOADAVATAR_RESPONSE = 'UPLOADAVATAR_RESPONSE';

export class GetUserProfileAction implements Action {
  readonly type: any = GETUSERPROFILE;
  constructor(public payload: {action: string, id: number, token: string}) {}
}

export class GetUserResponse implements Action {
  readonly type: any = GETUSER_RESPONSE;
  constructor(public payload: {success: boolean, user: IUser}) {}
}

export class UploadAvatarAction implements Action {
  readonly type: any = UPLOADAVATAR;
  constructor(public payload: {action: string, id: number, avatar: File, token: string}) {}
}

export class UploadAvatarResponse implements Action {
  readonly type: any = UPLOADAVATAR_RESPONSE;
  constructor(public payload: {success: boolean, account: IUserAccount}) {}
}


export type USER_ACTIONS =
  | GetUserProfileAction
  | GetUserResponse
  | UploadAvatarAction
  | UploadAvatarResponse;

