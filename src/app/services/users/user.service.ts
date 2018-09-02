import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReplaySubject } from 'rxjs';
import { Action } from '@ngrx/store';
import { SettingsService } from '../config/settings.service';
import {empty_user , IUser} from '../../models/users/user';
import * as userActions from '../../middleware/actions/userActions';


@Injectable()
export class UserService {

  constructor(
    private http: HttpClient,
    private settings: SettingsService
  ) { }

  getUser(id: number, token: string): Observable<Action> {
    const endpoint = this.settings.getSettings().api_endpoint;
    const serverResponse: ReplaySubject<Action> = new ReplaySubject<Action>(1);
    this.http.get<any>(endpoint + '/users/' + id + '/', {params: {['token']: token}})
      .subscribe( (response: IUser) => {
        if (response) {
          serverResponse.next(new userActions.GetUserResponse({success: true, user: response}) );
        }
      });
    return serverResponse;
  }


  uploadAvatar(id: number, avatar: File, token: string): Observable<Action> {
    const endpoint = this.settings.getSettings().api_endpoint;
    const uploadResponse: ReplaySubject<Action> = new ReplaySubject<Action>(1);
    const formData = new FormData();
    formData.append('avatar', avatar, avatar.name);
    this.http.put<any>(endpoint + '/avatar/' + id + '/', formData, {headers: {['Authorization']: 'JWT ' + token}})
      .subscribe(
        (response) => {
          if (response) {
            uploadResponse.next(new userActions.GetUserResponse({success: true, user: response}));
          } else {
            uploadResponse.next(new userActions.GetUserResponse({success: false, user: response}));
          }
        },
        (error) => {
          uploadResponse.next(new userActions.GetUserResponse({success: true, user: empty_user}));
        }
      );
    return uploadResponse;
  }

}
