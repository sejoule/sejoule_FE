import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { AlertService } from '../../services/alerts/alert.service';
import { switchMap, take } from 'rxjs/internal/operators';
import * as userActions from '../actions/userActions';
import * as appActions from '../actions/appActions';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';



@Injectable()
export class AppEffects {
  constructor(
    private action$: Actions,
    private auth: AuthenticationService,
    private alertService: AlertService,
    private router: Router
  ) { }


  @Effect()
  alert$: Observable<Action> = this.action$
    .ofType<appActions.ALERT_ACTIONS>(appActions.ALERT)
    .pipe(
      first(),
      tap((alert: appActions.AlertAction) => {
        this.alertService.alert(alert.payload.message);
      })
    );

}



