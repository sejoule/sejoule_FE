import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AlertService } from '../../services/alerts/alert.service';
import { switchMap, take } from 'rxjs/internal/operators';
import * as appActions from '../actions/appActions';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';
import { empty_authuser } from '../../models/users/user';



@Injectable()
export class AppEffects {
  constructor(
    private action$: Actions,
    private auth: AuthenticationService,
    private alertService: AlertService,
    private router: Router
  ) { }

  // This should be an effect so that the state can be persisted
  @Effect()
  logInOut$: Observable<Action> = this.action$
    .ofType<appActions.LOGINOUT_ACTIONS>(appActions.LOGINOUT)
    .pipe(
      switchMap((action: appActions.LoginAction) => {
        let logInOutResp: Observable<Action>;
        switch (action.payload.action) {
          case appActions.LOGIN:
            logInOutResp = this.auth.loginUser(action.payload.username, action.payload.password)
              .pipe(
                tap((response: appActions.LoginResponse) => {
                  if (response.payload.success) {
                    // todo new appActions.AlertAction({message: 'Successfully logged in.'});
                    this.router.navigate(['home']);
                  } else {
                    // todo new appActions.AlertAction({message: 'Unable to login.'});
                  }
                  // should log the action here
                  // the reducer should get this and modify the state
                  new appActions.LoginResponse({success: true, authuser: empty_authuser , token: ''});
                } )
              );
            return logInOutResp;
          case appActions.LOGOUT:
            logInOutResp = this.auth.logOutUser(action.payload.username)
              .pipe(
                tap((response: appActions.LogOutResponse) => {
                  if (response.payload.success) {
                    // todo new appActions.AlertAction({message: 'Successfully logged out.'});
                    // todo may need to fix this
                    this.router.navigate(['/external/login']);
                  } else {
                    // todo new appActions.AlertAction({message: 'Unable to logout.'});
                  }
                  // should log the action here
                  // the reducer should get this and modify the state
                  new appActions.LogOutResponse({success: true, authuser: ''});
                } )
              );
            return logInOutResp;
          default: return logInOutResp;
        }
      }),
    );

  @Effect()
  alert$: Observable<Action> = this.action$
    .ofType<appActions.AlertAction>(appActions.ALERT)
    .pipe(
      tap((alert: appActions.AlertAction) => {
        this.alertService.alert(alert.payload.message);
      })
    );

}



