import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../middleware/reducers';
import { pipe, Subscription } from 'rxjs';
import {empty_authuser , empty_user , IAuthUser , init_account , IUser , IUserAccount} from '../../models/users/user';
import * as userAction from '../../middleware/actions/userActions';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  @ViewChild('file') fileElement: any;
  profileForm: FormGroup;
  passwordForm: FormGroup;
  notificationsForm: FormGroup;
  subscription: Subscription;
  user: IUser = empty_user;
  auth_user: IAuthUser = empty_authuser;
  avatar_to_upld: File;

  ngOnInit(): void {
    this.subscription = this.store.select('userReducer').subscribe(
      response => {
        this.user = response['user'];
      },
      error => console.log(error)
    );
    this.subscription = this.store.select('loginReducer').subscribe(
      response => {
        this.auth_user = response['authuser'];
      },
      error => console.log(error)
    );
    this.populateForm();
  }

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private store: Store<AppState>,
  ) {  }

  populateForm(): void {
    this.profileForm = this.fb.group({
      firstname: [this.user.first_name, Validators.required],
      lastname: [this.user.last_name, Validators.required],
      email: [this.user.email, Validators.required],
      location: 'Sitia, Crete, Greece',
      website: this.user.account.website, // todo: remove user
      describe: this.user.account.description,
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

  addFileDialog(): void {
    this.fileElement.nativeElement.click();
  }

  filesAdded(): void {
    this.avatar_to_upld = this.fileElement.nativeElement.files[0];
    this.changeAvatar();
  }

  changeAvatar(): void {
      this.store.dispatch(new userAction.UploadAvatarAction({
      action: userAction.UPLOADAVATAR,
      id: this.auth_user.id,
      avatar: this.avatar_to_upld,
      token: this.auth_user.token
    }));
  }

  showAlert(): void {
    this.snackBar.open('Settings Updated', '', {
      duration: 3000,
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
