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
    .ofType<fileActions.FILE_ACTIONS>(fileActions.UPLOADFILES)
    .pipe(
      switchMap((action: fileActions.UploadfilesAction) => {
        if ( action.payload.with_progress === true) {
          let uploadResp: Observable<Action>;
          uploadResp = this.fileService.uploadFileWithProgess(action.payload.files, action.payload.token)
            .pipe(
              tap((response: fileActions.UploadfilesProgress) => {
                  this.store.dispatch(new appActions.AlertAction({
                    message: 'Upload completed. ' + response.payload.length + ' files uploaded.'
                  }));
              }
              )
            );
          return uploadResp;
        }else {
          let uploadResp: Observable<Action>;
          uploadResp = this.fileService.uploadFile(action.payload.files, action.payload.token)
            .pipe(
              first(),
              tap((response: fileActions.UploadfilesResponse) => {
                this.store.dispatch(new appActions.AlertAction({
                  message: 'Upload completed. ' + response.payload.length + ' files uploaded.'
                }));
              })
            );
          return uploadResp;
        }
      }),
    );


}



