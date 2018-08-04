import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { first, switchMap, take } from 'rxjs/internal/operators';
import * as userActions from '../actions/userActions';
import { empty_user } from '../../models/users/user';
import { UserService } from '../../services/users/user.service';
import { Router } from '@angular/router';



@Injectable()
export class UserEffects {
  constructor(
    private action$: Actions,
    private userService: UserService,
    private router: Router
  ) { }

  // This should be an effect so that the state can be persisted
  @Effect()
  getUserProfile$: Observable<Action> = this.action$
    .ofType<userActions.USER_ACTIONS>(userActions.GETUSERPROFILE)
    .pipe(
      switchMap((action: userActions.GetUserProfileAction) => {
        let getUserResp: Observable<Action>;
        getUserResp = this.userService.getUser(action.payload.id, action.payload.token)
        .pipe(
          first(),
          tap((response: userActions.GetUserResponse) => {
            if (response.payload.success) {
              // todo persist the authuser
              this.router.navigate(['/pages/profile']);
            } else {
              // todo send a notification or log an error
              console.log('error getting user profile');
            }
            // should log the action here
            // the reducer should get this and modify the state
            // new userActions.GetUserResponse({success: true, user: empty_user });
          } )
        );
      return getUserResp;
      }),
    );



}



