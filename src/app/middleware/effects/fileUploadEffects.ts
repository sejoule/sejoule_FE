import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/observable';
import { tap } from 'rxjs/operators';
import { first, switchMap, take } from 'rxjs/internal/operators';
import * as fileActions from '../actions/fileActions';
import { empty_user } from '../../models/users/user';
import { UserService } from '../../services/users/user.service';
import { Router } from '@angular/router';
import { FileuploadService } from '../../services/fileupload/fileupload.service';



@Injectable()
export class FileUploadEffects {
  constructor(
    private action$: Actions,
    private fileService: FileuploadService,
    private router: Router
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
            tap((response: fileActions.FileResponse) => {
              if (response.payload.success) {
                // todo persist the authuser
                // this.router.navigate(['/pages/profile']);
              } else {
                // todo send a notification or log an error
                console.log('error getting user profile');
              }
              // should log the action here
              // the reducer should get this and modify the state
              new fileActions.FileResponse({success: true, filename: '' });
            } )
          );
        return uploadResp;
      }),
    );



}



