import { Injectable } from '@angular/core';

import { Action , Store} from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { first, switchMap, take } from 'rxjs/internal/operators';
import * as userActions from '../actions/userActions';
import { UserService } from '../../services/users/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { AlertService } from '../../services/alerts/alert.service';
import { AppState } from '../reducers';

@Injectable()
export class UserEffects {
  constructor(
    private action$: Actions,
    private auth: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private store: Store<AppState>,
    private alertService: AlertService
  ) { }


  @Effect()
  logIn$: Observable<Action> = this.action$
    .ofType<userActions.LoginAction>(userActions.LOGIN)
    .pipe(
      switchMap((action: userActions.LoginAction) => {
        let loginResp: Observable<Action>;
        loginResp = this.auth.loginUser(action.payload.username, action.payload.password)
        .pipe(
          first(),
          tap((response: userActions.LoginResponse) => {
            if (response.payload.success) {
              this.store.dispatch(
                new userActions.GetUserProfileAction({
                    id: response.payload.authuser.id,
                    token: response.payload.authuser.token,
                  }
                ));
              this.router.navigate(['home']);
              this.alertService.alert('Login Successful. Welcome ' + response.payload.authuser.username);
            } else {
              this.alertService.alert('Login Unsuccessful. Please check your username and password.');
            }
          })
        );
        return loginResp;
      }),
    );

  @Effect()
  logOut$: Observable<Action> = this.action$
    .ofType<userActions.LogoutAction>(userActions.LOGOUT)
    .pipe(
      switchMap((action: userActions.LogoutAction) => {
        let logoutResp: Observable<Action>;
        logoutResp = this.auth.logOutUser(action.payload.id, action.payload.token)
          .pipe(
            first(),
            tap((response: userActions.LogOutResponse) => {
              if (response.payload.success) {
                this.router.navigate(['external/login']);
              } else {
                // NOTE: can log to the console
              }
            })
          );
        return logoutResp;
      }),
    );

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
              // NOTE: can send a notification or log an error
              console.log('error getting user profile');
            }
            // NOTE: can log the action here
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
                  // NOTE: can do something here
                } else {
                  // NOTE: can do something here
                }
              }
            )
          );
        return uploadResp;
      }),
    );


}



