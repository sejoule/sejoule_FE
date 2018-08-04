import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../middleware/reducers';
import { pipe, Subscription } from 'rxjs';
import { empty_user, IUser } from '../../models/users/user';


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
  user: IUser = empty_user;

  ngOnInit(): void {
    this.subscription = this.store.select('userReducer').subscribe(
      response => {
        this.populateForm(response['user']);
      },
      error => console.log(error)
    );
  }

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private store: Store<AppState>,
    // private userStore: Store<UserState>
  ) {  }

  populateForm(user: IUser): void {
    this.profileForm = this.fb.group({
      firstname: [user.first_name, Validators.required],
      lastname: [user.last_name, Validators.required],
      email: [user.email, Validators.required],
      location: 'Sitia, Crete, Greece',
      website: user.website,
      describe: user.description
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
    this.store.select('appReducer').subscribe(
      event => id = event.authuser['id']
    );
    return id;
  }

  get getUsrToken(): string {
    let token = '';
    this.store.select('appReducer').subscribe(
      event => token = event['token']
    );
    return token;
  }

  showSnackbar(): void {
    this.snackBar.open('Settings Updated', '', {
      duration: 3000,
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
