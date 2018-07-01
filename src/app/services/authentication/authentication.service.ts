import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import { map } from 'rxjs/operators';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/observable';
import * as appActions from '../../appstate/actions/appActions';
import { ReplaySubject } from 'rxjs';
import { AppState } from '../../appstate/reducers';
import { empty_authuser } from '../../models/users/user';

@Injectable()
export class AuthenticationService {
  constructor(
    private http: HttpClient
  ) { }

  public logInOutResponse: ReplaySubject<Action> = new ReplaySubject<Action>(1);

  loginUser(username: string, password: string): Observable<Action> {
    // this.http.post<any>('/api/authenticate/login', {username: username, password: password})
    this.http.post<any>('http://13.209.45.228:8000/api-token-user_auth/', {username: username, password: password})
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
    this.http.post<any>('/api/authenticate/logout', {username: username})
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



