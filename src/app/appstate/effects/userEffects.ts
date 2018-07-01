import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/observable';
import { tap } from 'rxjs/operators';
import { switchMap, take } from 'rxjs/internal/operators';
import * as userActions from '../../appstate/actions/userActions';
import { empty_user } from '../../models/users/user';
import { UserService } from '../../services/users/user.service';



@Injectable()
export class UserEffects {
  constructor(
    private action$: Actions,
    private userService: UserService,
  ) { }

  // This should be an effect so that the state can be persisted
  @Effect()
  getUser$: Observable<Action> = this.action$
    .ofType<userActions.USER_ACTIONS>(userActions.GETUSER)
    .pipe(
      switchMap((action: userActions.GetUserAction) => {
        let getUserResp: Observable<Action>;
        // call the service to get the authuser and determine if it was successful
        getUserResp = this.userService.getUser(action.payload.id, action.payload.token)
        .pipe(
          tap((response: userActions.GetUserResponse) => {
            if (response.payload.success) {
              // todo persist the authuser
            } else {
              // todo send a notification or log an error
            }
            // should log the action here
            // the reducer should get this and modify the state
            new userActions.GetUserResponse({success: true, user: empty_user });
          } )
        );
      return getUserResp;
      }),
    );



}



