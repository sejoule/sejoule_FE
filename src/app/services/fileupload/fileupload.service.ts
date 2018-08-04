import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

import { Action } from '@ngrx/store';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import * as fileActions from '../../middleware/actions/fileActions';
import { SettingsService } from '../config/settings.service';

@Injectable()
export class FileuploadService {

  constructor(
    private http: HttpClient,
    private settings: SettingsService
  ) {  }

  uploadFile(file: any, token: string): Observable<Action> {
    const endpoint = this.settings.getSettings().api_endpoint;
    const fileuploadResponse: ReplaySubject<Action> = new ReplaySubject<Action>(1);
    this.http.post<any>(endpoint + '/tosca/upload', file, {headers: {['Authorization']: 'JWT ' + token}})
      .subscribe(
        (response) => {
          if (response) {
            fileuploadResponse.next(new fileActions.UploadfileResponse({success: true, filename: response}));
          } else {
            fileuploadResponse.next(new fileActions.UploadfileResponse({success: false, filename: ''}));
          }
        },
        () => {
          fileuploadResponse.next(new fileActions.UploadfileResponse({success: false, filename: ''}));
        });
    return fileuploadResponse;
  }

  uploadFileWithProgess(file: any, token: string): Observable<Action> {
    const endpoint = this.settings.getSettings().api_endpoint;
    const fileuploadSubject = new Subject<Action>();
    this.http.post<any>(endpoint + '/tosca/upload', file, {headers: {['Authorization']: 'JWT ' + token}, reportProgress: true})
      .subscribe(
        (progress) => {
          if (progress.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round(100 * progress.loaded / progress.total);
            fileuploadSubject.next(new fileActions.UploadfileProgress({filename: file, percent_upload: percentDone}));
          } else if (progress instanceof Response) {
            fileuploadSubject.complete();
          }
        },
        () => {
          fileuploadSubject.next(new fileActions.UploadfileProgress({filename: file, percent_upload: 0}));
        });
    return fileuploadSubject;
  }

}



