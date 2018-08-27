import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { first, switchMap, take } from 'rxjs/internal/operators';
import * as userActions from '../actions/userActions';
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
            } else {
              // todo send a notification or log an error
              console.log('error getting user profile');
            }
            // todo should log the action here
            // the reducer should get this and modify the state
            // new userActions.GetUserResponse({success: true, user: empty_user });
          } )
        );
      return getUserResp;
      }),
    );

  @Effect()
  uploadAvatar$: Observable<Action> = this.action$
    .ofType<userActions.USER_ACTIONS>(userActions.UPLOADAVATAR)
    .pipe(
      switchMap((action: userActions.UploadAvatarAction) => {
        let uploadResp: Observable<Action>;
        uploadResp = this.userService.uploadAvatar(action.payload.id, action.payload.avatar, action.payload.token)
          .pipe(
            tap((response: userActions.UploadAvatarResponse) => {
                if (response.payload.success) {
                  // todo: do something here
                  // this.store.dispatch(new appActions.AlertAction({
                  //   message: 'Avatar successfully changed'
                  // }));
                } else {
                  // this.store.dispatch(new appActions.AlertAction({
                  //   message: 'Failed to change Avatar.'
                  // }));
                }
              }
            )
          );
        return uploadResp;
      }),
    );



}



