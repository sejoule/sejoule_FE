import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState, UserState } from '../../appstate/reducers';
import * as userAction from '../../appstate/actions/userActions';
import { Subscription } from 'rxjs';
import { IUser } from '../../models/users/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  notificationsForm: FormGroup;
  subscription: Subscription;
  user: IUser;

  ngOnInit(): void {
    let id = this.getUsrId;
    let token = this.getUsrToken;
    this.userStore.dispatch(new userAction.GetUserAction({
      action: userAction.GETUSER,
      id: id,
      token: token,
    }));
    // this.subscription = this.userStore.select('userReducer').subscribe(
    //   event => {
    //     this.user = event['user'];
    //     // this.populateForm();
    //   }
    // );
  }

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private appStore: Store<AppState>,
    private userStore: Store<UserState>
  ) { }

  populateForm(): void {
    this.profileForm = this.fb.group({
      firstname: [this.user.firstName, Validators.required],
      lastname: [this.user.lastName, Validators.required],
      email: [this.user.email, Validators.required],
      location: 'Sitia, Crete, Greece',
      website: this.user.website,
      describe: this.user.description
    });

    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    });

    this.notificationsForm = this.fb.group({
      showLocation: ['', Validators.required],
      showAvatar: ['true', Validators.required],
      sendNotifications: ['', Validators.required],
      showUsername: ['true', Validators.required],
      showProfile: ['true', Validators.required],
      showBackups: ['', Validators.required],
    });
  }

  get getUsrId(): number {
    let id = -1;
    this.appStore.select('appReducer').subscribe(
      event => id = event.authuser['id']
    );
    return id;
  }

  get getUsrToken(): string {
    let token = '';
    this.appStore.select('appReducer').subscribe(
      event => token = event['token']
    );
    return token;
  }

  showSnackbar(): void {
    this.snackBar.open('Settings Updated', '', {
      duration: 3000,
    });
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }

}
