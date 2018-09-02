import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../middleware/reducers';
import { empty_authuser, empty_user, IAuthUser, init_account, IUser, IUserAccount } from '../../../models/users/user';
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
      click: () => { this.showProfilePage(); }
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
  user: IUser = empty_user;
  subscription: Subscription;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  // subscribe the the reducer to get the changes to the application state
  ngOnInit(): void {
    this.subscription = this.store.select('loginReducer').subscribe(
      (event) => this.authuser = event['authuser']
    );
    this.store.select('userReducer').subscribe(
      event => this.user = event.user
    );
  }

  showProfilePage(): void {
    this.router.navigate(['/pages/profile']);
  }

  logout(): void {
    this.store.dispatch( new userAction.LogoutAction({
      id: this.authuser.id,
      token: this.authuser.token
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
