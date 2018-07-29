import { FILE_RESPONSE } from '../actions/fileActions';

export interface  FileReducerState {
  fileState: boolean,
  file: string;
}

const initialState: FileReducerState = {
  fileState: false,
  file : ''
};

export function fileReducer( state: FileReducerState = initialState, action: any ): FileReducerState {
  switch (action.type) {
    case FILE_RESPONSE:
      return {
        ...state,
        fileState : action.payload.state ? action.payload.state: false,
        file : action.payload.file
      };
  }
  return state;
}
