import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/observable';
import * as appActions from '../../middleware/actions/appActions';
import { ReplaySubject } from 'rxjs';
import { empty_authuser } from '../../models/users/user';
import { SettingsService } from '../config/settings.service';

@Injectable()
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private settings: SettingsService
  ) {  }

  public logInOutResponse: ReplaySubject<Action> = new ReplaySubject<Action>(1);

  loginUser(username: string, password: string): Observable<Action> {
    const endpoint = this.settings.getSettings().api_endpoint;
    this.http.post<any>(endpoint + '/api-token-user_auth/', {username: username, password: password})
      .subscribe(
        (response) => {
          if (response.token) {
            this.logInOutResponse.next(new appActions.LoginResponse({success: true, authuser: response.user, token: response.token}));
          } else {
            this.logInOutResponse.next(new appActions.LoginResponse({success: false, authuser: empty_authuser, token: ''}));
          }
        },
        () => {
          this.logInOutResponse.next(new appActions.LoginResponse({success: false, authuser: empty_authuser, token: ''}));
        });
    return this.logInOutResponse;
  }

  logOutUser(username: string): Observable<Action> {
    const endpoint = this.settings.getSettings().api_endpoint;
    this.http.post<any>(endpoint + '/api/authenticate/logout', {username: username})
      .subscribe(
        (response) => {
          if (response.username) {
            this.logInOutResponse.next(new appActions.LogOutResponse({success: true, authuser: response.username}));
          } else {
            this.logInOutResponse.next(new appActions.LogOutResponse({success: false, authuser: ''}));
          }
        },
        () => {
          this.logInOutResponse.next(new appActions.LogOutResponse({success: false, authuser: ''}));
        });
    return this.logInOutResponse;
  }

}



