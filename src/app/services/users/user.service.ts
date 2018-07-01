import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { ReplaySubject } from 'rxjs';
import { Action } from '@ngrx/store';


@Injectable()
export class UserService {

  constructor(private http: HttpClient) { }

  public serverResponse: ReplaySubject<Action> = new ReplaySubject<Action>(1);

  getUser(id: number, token: string): Observable<Action> {
    this.http.get<any>('http://13.209.45.228:8000/users/' + id + '/', {params: {['token']: token}})
      .subscribe( response => {
        if (response.status === 200) {
          this.serverResponse.next(response.data);
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
