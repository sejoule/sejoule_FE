import { Action } from '@ngrx/store';

// Effects
export const UPLOADFILE = 'UPLOADFILE';
export const FILE_RESPONSE = 'FILE_RESPONSE';
export const FILE_PROGRESS = 'FILE_PROGRESS';


export class UploadfileAction implements Action {
  readonly type: any = UPLOADFILE;
  constructor(public payload: {action: string, file: any, token: string}) {}
}

export class UploadfileResponse implements Action {
  readonly type: any = FILE_RESPONSE;
  constructor(public payload: {success: boolean, filename: string}) {}
}

export class UploadfileProgress implements Action {
  readonly type: any = FILE_PROGRESS;
  constructor(public payload: {filename: string, percent_upload: number}) {}
}


export type FILE_ACTIONS =
  | UploadfileAction
  | UploadfileResponse
  | UploadfileProgress;

