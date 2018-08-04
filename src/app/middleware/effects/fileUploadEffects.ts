import { Injectable } from '@angular/core';

import { Action, Store } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { first, switchMap, take } from 'rxjs/internal/operators';
import * as fileActions from '../actions/fileActions';
import * as appActions from '../actions/appActions';
import { FileuploadService } from '../../services/fileupload/fileupload.service';
import { AppState } from '../reducers';



@Injectable()
export class FileUploadEffects {
  constructor(
    private store: Store<AppState>,
    private action$: Actions,
    private fileService: FileuploadService
  ) { }

  // This should be an effect so that the state can be persisted
  @Effect()
  uploadFile$: Observable<Action> = this.action$
    .ofType<fileActions.FILE_ACTIONS>(fileActions.UPLOADFILE)
    .pipe(
      switchMap((action: fileActions.UploadfileAction) => {
        let uploadResp: Observable<Action>;
        uploadResp = this.fileService.uploadFile(action.payload.file, action.payload.token)
          .pipe(
            first(),
            tap((response: fileActions.UploadfileResponse) => {
              if (response.payload.success) {
                this.store.dispatch(new appActions.AlertAction({message: 'Successfully uploaded file'}));
              } else {
                this.store.dispatch(new appActions.AlertAction({message: 'File upload failed for '}));
                console.log('Error uploading file');
              }
            } )
          );
        return uploadResp;
      }),
    );



}



