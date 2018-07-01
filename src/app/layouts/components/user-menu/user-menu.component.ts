import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../appstate/reducers';
import * as appAction from '../../../appstate/actions/appActions';
import { empty_authuser, IAuthUser } from '../../../models/users/user';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'portal-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit, OnDestroy {
  menus: any[] = [
    {
      title: 'My Profile',
      icon: 'account_circle',
      click: () => { this. gotoMenu('/pages/profile'); }
    },
    {
      title: 'Activity',
      icon: 'info',
      click: ''
    },
    {
      title: 'Notifications',
      icon: 'notifications',
      click: ''
    },
    {
      title: 'Settings and privacy',
      icon: 'security',
      click: ''
    },
    {
      title: 'Help Center',
      icon: 'help',
      click: ''
    },
    {
      title: 'Sign Out',
      icon: 'exit_to_app',
      click: () => { this.logout(); }
    }
  ];
  authuser: IAuthUser = empty_authuser;
  subscription: Subscription

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  // subscribe the the reducer to get the changes to the application state
  ngOnInit(): void {
    this.subscription = this.store.select('appReducer').subscribe(
      (event) => this.authuser = event['authuser']
    );
  }

  gotoMenu( route: string): void {
    this.router.navigate([route] );
  }

  logout(): void {
    let user: IAuthUser;
    this.store.select('appReducer').subscribe(
      event => { user = event['authuser']; });
    this.store.dispatch( new appAction.LogoutAction({
      action: appAction.LOGOUT,
      username: user.username
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
