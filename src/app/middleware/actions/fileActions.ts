import { Action } from '@ngrx/store';
import { FileProgress, FileUpload, YamlUpload } from '../reducers/fileReducer';

// Effects
export const UPLOADFILES = 'UPLOADFILES';
export const UPLOADYAML = 'UPLOADYAML';
export const UPLOADYAML_RESPONSE = 'UPLOADYAML_RESPONSE';
export const UPLOADFILES_RESPONSE = 'UPLOADFILES_RESPONSE';
export const UPLOADFILES_PROGRESS = 'UPLOADFILES_PROGRESS';


export class UploadfilesAction implements Action {
  readonly type: any = UPLOADFILES;
  constructor(public payload: {action: string, files: Set<File>, token: string , with_progress: boolean}) {}
}

export class UploadyamlAction implements Action {
  readonly type: any = UPLOADYAML;
  constructor(public payload: {action: string, yaml: string, token: string}) {}
}

export class UploadyamlResponse implements Action {
  readonly type: any = UPLOADYAML_RESPONSE;
  constructor(public payload: YamlUpload) {}
}

export class UploadfilesResponse implements Action {
  readonly type: any = UPLOADFILES_RESPONSE;
  constructor(public payload: FileUpload[]) {}
}

export class UploadfilesProgress implements Action {
  readonly type: any = UPLOADFILES_PROGRESS;
  constructor(public payload: FileProgress[]) {}
}


export type FILE_ACTIONS =
  | UploadfilesAction
  | UploadyamlAction
  | UploadfilesResponse
  | UploadfilesProgress;

