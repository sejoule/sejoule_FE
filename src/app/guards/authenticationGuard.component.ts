import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserLoginState } from '../middleware/reducers/userReducer';
import { LOGGED_IN , LOGGED_OUT } from '../middleware/actions/userActions';
import {empty_authuser , IAuthUser} from '../models/users/user';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  auth_user: IAuthUser = empty_authuser;
  login_state: string = LOGGED_OUT;

  constructor(
    private router: Router,
    private store: Store<UserLoginState>
  ) {
    this.store.select('loginReducer').subscribe(
      (response: UserLoginState) => {
        this.auth_user = response.authuser;
        this.login_state = response.login_state;
      });
  }

  // add logic for locking
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    if (this.login_state === LOGGED_IN) {
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['external']);
    return false;
  }
}
