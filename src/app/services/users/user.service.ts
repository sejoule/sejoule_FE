import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReplaySubject } from 'rxjs';
import { Action } from '@ngrx/store';
import { SettingsService } from '../config/settings.service';
import { IUser } from '../../models/users/user';
import * as userActions from '../../middleware/actions/userActions';


@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
    private settings: SettingsService
  ) { }

  public serverResponse: ReplaySubject<Action> = new ReplaySubject<Action>(1);

  getUser(id: number, token: string): Observable<Action> {
    const endpoint = this.settings.getSettings().api_endpoint;
    this.http.get<any>(endpoint + '/users/' + id + '/', {params: {['token']: token}})
      .subscribe( (response: IUser) => {
        if (response) {
          this.serverResponse.next(new userActions.GetUserResponse({success: true, user: response}) );
        }
      });
    return this.serverResponse;
  }

  // getAll() {
  //   return this.http.get<IUser[]>('/api/users');
  // }
  //
  // getById(id: number) {
  //   return this.http.get('/api/users/' + id);
  // }
  //
  // create(authuser: IUser) {
  //   return this.http.post('/api/users', authuser);
  // }
  //
  // update(authuser: IUser) {
  //   return this.http.put('/api/users/' + authuser.id, authuser);
  // }
  //
  // delete(id: number) {
  //   return this.http.delete('/api/users/' + id);
  // }
  //
  // alterUserState(changeType: any, state: any) {
  //   changeType = changeType || GETT;
  //   state = state || {};
  //   switch (changeType) {
  //     case GETT:
  //       return this.userState;
  //     case SETT:
  //       this.store.dispatch({
  //         type: state.action,
  //         payload: state.payload
  //       });
  //       break;
  //     default: return this.userState;
  //   }
  // }
}
