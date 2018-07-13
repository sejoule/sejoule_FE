import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { AlertService } from '../../services/alerts/alert.service';

import { UserService } from '../../services/users/user.service';
import { ALERT } from '../../middleware/actions/appActions';
import { AppState } from '../../middleware/reducers';
import { Store } from '@ngrx/store';
import { SettingsService } from '../../services/config/settings.service';

@Component({
  selector: 'portal-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  register1: '';
  register2: '';
  register3: '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticator: AuthenticationService,
    private alertService: AlertService,
    private user: UserService,
    private store: Store<AppState>,
    private settings: SettingsService
  ) {  }

  ngOnInit(): void {
    // const emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
    const formOptions = {
      'first_name': ['', Validators.required],
      'last_name': ['', Validators.required],
      'username': ['', Validators.required, /*Validators.pattern(emailRegex)]*/],
      'password': ['', Validators.required],
      'passwordConfirm': ['', Validators.required]
    };

    this.register1 = this.settings.getAppText().registration1;
    this.register2 = this.settings.getAppText().registration2;
    this.register3 = this.settings.getAppText().registration3;

    this.registerForm = this.formBuilder.group(formOptions, {
      validator: this.matchingPasswordsValidator('password', 'passwordConfirm')
    });
  }

  register(): void {
    if (this.registerForm.invalid) {
      this.store.dispatch({type: ALERT, payload: 'Invalid login information'});
      return;
    }

    // this.authuser.create(this.registerForm.value)
    //   .pipe(first())
    //   .subscribe(
    //     () => {
    //       // Need to check if creation was successful
    //       this.store.dispatch({type: ALERT, payload: 'Registration successful'});
    //       this.router.navigate(['/external/login']);
    //     },
    //     error => {
    //       this.store.dispatch({type: ALERT, payload: error});
    //     });
  }

  login(): void {
    this.router.navigate(['/external/login']);
  }

  matchingPasswordsValidator(passwordKey: string, confirmPasswordKey: string): any {
    return (group: FormGroup) => {
      const password = group.controls[passwordKey];
      const confirmPassword = group.controls[confirmPasswordKey];

      if (!password.value || !confirmPassword.value) {
        return null;
      }
      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
      return null;
    };
  }

}
