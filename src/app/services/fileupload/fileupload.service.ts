import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fileActions from '../../middleware/actions/fileActions';
import { ReplaySubject } from 'rxjs';
import { empty_authuser } from '../../models/users/user';
import { SettingsService } from '../config/settings.service';

@Injectable()
export class FileuploadService {

  constructor(
    private http: HttpClient,
    private settings: SettingsService
  ) {  }

  public logInOutResponse: ReplaySubject<Action> = new ReplaySubject<Action>(1);

  uploadFile(file: any, token: string): Observable<Action> {
    const endpoint = this.settings.getSettings().api_endpoint;
    this.http.post<any>(endpoint + '/tosca/upload', file, {params: {['token']: token}})
      .subscribe(
        (response) => {
          if (response) {
            this.logInOutResponse.next(new fileActions.FileResponse({success: true, filename: ''}));
          } else {
            this.logInOutResponse.next(new fileActions.FileResponse({success: false, filename: ''}));
          }
        },
        () => {
          this.logInOutResponse.next(new fileActions.FileResponse({success: false, filename: ''}));
        });
    return this.logInOutResponse;
  }

}



