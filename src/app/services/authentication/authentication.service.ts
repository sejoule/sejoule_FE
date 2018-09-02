import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as userActions from '../../middleware/actions/userActions';
import { ReplaySubject } from 'rxjs';
import { empty_authuser } from '../../models/users/user';
import { SettingsService } from '../config/settings.service';
import { LOGGED_IN, LOGGED_OUT } from '../../middleware/actions/userActions';

@Injectable()
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private settings: SettingsService
  ) {  }

  loginUser(username: string, password: string): Observable<Action> {
    const endpoint = this.settings.getSettings().api_endpoint;
    const logInResponse: ReplaySubject<Action> = new ReplaySubject<Action>(1);
    this.http.post<any>(endpoint + '/api-token-user_auth/', {username: username, password: password})
      .subscribe(
        (response) => {
          if (response.token) {
            logInResponse.next(
              new userActions.LoginResponse({
                login_state: LOGGED_IN, success: true, authuser: {
                  id: response.user.id,
                  username: response.user.username,
                  token: response.token
                }
              })
            );
          } else {
            logInResponse.next(
              new userActions.LoginResponse({login_state: LOGGED_IN, success: false, authuser: empty_authuser})
            );
          }
        },
        () => {
          logInResponse.next(
            new userActions.LoginResponse({login_state: LOGGED_IN, success: false, authuser: empty_authuser})
          );
        });
    return logInResponse;
  }

  logOutUser(id: number, token: string): Observable<Action> {
    const endpoint = this.settings.getSettings().api_endpoint;
    const logOutResponse: ReplaySubject<Action> = new ReplaySubject<Action>(1);
    this.http.post<any>(endpoint + '/api-user_auth/logout', {'id': id }, { headers: {['Authorization']: 'JWT ' + token}})
      .subscribe(
        (response) => {
          if (response.username) {
            logOutResponse.next(
              new userActions.LogOutResponse({
                login_state: LOGGED_OUT, success: true, authuser: {
                  id: -1,
                  username: response.username,
                  token: ''
                }
              })
            );
          } else {
            logOutResponse.next(
              new userActions.LogOutResponse({login_state: LOGGED_OUT, success: false, authuser: empty_authuser})
            );
          }
        },
        (error) => {
          logOutResponse.next(
            new userActions.LogOutResponse({login_state: LOGGED_OUT, success: false, authuser: empty_authuser})
          );
        });
    return logOutResponse;
  }

}



