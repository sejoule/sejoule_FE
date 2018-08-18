import { UPLOADFILES_PROGRESS, UPLOADFILES_RESPONSE } from '../actions/fileActions';
import * as fileActions from '../actions/fileActions';


export interface  FileUpload {
  filename: string;
  done: boolean;
  saved_filename: string;
}

export interface FileProgress {
    filename: string;
    percent_upload: number;
    done: boolean;
    saved_filename: string;
}

export interface FileUploadState {
  fileUploads: FileUpload[];
}

export interface  FileProgressState {
  fileProgresses: FileProgress[];
}


const initialUploadState: FileUploadState = {
  fileUploads: []
};

const initialProgressState:  FileProgressState = {
  fileProgresses: []
};

export function fileUploadReducer( state: FileUploadState = initialUploadState,
                             action: fileActions.UploadfilesResponse ): FileUploadState {
  switch (action.type) {
    case UPLOADFILES_RESPONSE:
      return {
        ...state,
        fileUploads: action.payload
      };
  }
  return state;
}

export function fileProgressReducer( state: FileProgressState = initialProgressState,
                                     action: fileActions.UploadfilesProgress ): FileProgressState {
  switch (action.type) {
    case UPLOADFILES_PROGRESS:
      return {
        ...state,
        fileProgresses: action.payload
      };
  }
  return state;
}
