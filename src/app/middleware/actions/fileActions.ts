import { Action } from '@ngrx/store';
import { IUser } from '../../models/users/user';
import { GETUSER_RESPONSE } from './userActions';

// Effects
export const UPLOADFILE = 'UPLOADFILE';
export const FILE_RESPONSE = 'FILE_RESPONSE';


export class UploadfileAction implements Action {
  readonly type: any = UPLOADFILE;
  constructor(public payload: {action: string, file: any, token: string}) {}
}

export class FileResponse implements Action {
  readonly type: any = FILE_RESPONSE;
  constructor(public payload: {success: boolean, filename: string}) {}
}


export type FILE_ACTIONS =
  | UploadfileAction
  | FileResponse;

