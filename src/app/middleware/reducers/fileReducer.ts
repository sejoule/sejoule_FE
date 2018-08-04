import { FILE_PROGRESS, FILE_RESPONSE } from '../actions/fileActions';
import * as fileActions from '../actions/fileActions';


export interface  FileReducerState {
  fileState: boolean;
  file: string;
}

export interface FileProgress {
    filename: string;
    percent_upload: number;
}

export interface  FileProgressState {
  fileUploads: FileProgress;
}

const initialState: FileReducerState = {
  fileState: false,
  file : ''
};

const initialProgressState:  FileProgressState = {
  fileUploads: {
    filename: '',
    percent_upload: 0
  }
};

export function fileReducer( state: FileReducerState = initialState, action: fileActions.UploadfileResponse ): FileReducerState {
  switch (action.type) {
    case FILE_RESPONSE:
      return {
        ...state,
        fileState : action.payload.success ? action.payload.success : false,
        file : action.payload.filename
      };
  }
  return state;
}

export function fileProgressReducer( state: FileProgressState = initialProgressState, action: fileActions.UploadfileProgress ): FileProgressState {
  switch (action.type) {
    case FILE_PROGRESS:
      const key = action.payload.filename;
      return {
        ...state,
        // fileUploads: ...state.fileUploads = action.payload.percent_upload;
      };
  }
}
