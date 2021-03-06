import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../middleware/reducers';
import * as appAction from '../../../middleware/actions/appActions';
import { empty_authuser, IAuthUser } from '../../../models/users/user';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import * as userAction from '../../../middleware/actions/userActions';

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
      click: () => { this.getUserProfile(); }
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
  subscription: Subscription;
  id: number;
  token: string;

  constructor(
    private store: Store<AppState>
  ) { }

  // subscribe the the reducer to get the changes to the application state
  ngOnInit(): void {
    this.subscription = this.store.select('appReducer').subscribe(
      (event) => this.authuser = event['authuser']
    );
    this.store.select('appReducer').subscribe(event => this.id = event.authuser['id'] );
    this.store.select('appReducer').subscribe(event => this.token = event['token'] );
  }

  getUserProfile(): void {
    this.store.dispatch(
      new userAction.GetUserProfileAction({
          action: userAction.GETUSERPROFILE,
          id: this.id,
          token: this.token,
        }
      ));
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
