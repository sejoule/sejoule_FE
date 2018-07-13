import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../middleware/reducers';

@Injectable()
export class AuthenticationGuard implements CanActivate {

  constructor(
    private router: Router,
    private store: Store<AppState>
  ) { }

  // add logic for locking
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let loginState: boolean;
    this.store.subscribe(
      s => {
        loginState = s.appReducer.login_state;
      });

    if (loginState) {
      // logged in so return true
      return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['external']);
    return false;
  }
}
