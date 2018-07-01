import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppConfig } from '../../services/config/app-config.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { AlertService } from '../../services/alerts/alert.service';
import * as appAction from '../../appstate/actions/appActions';
import { Store } from '@ngrx/store';
import { AppState } from '../../appstate/reducers';


@Component({
  selector: 'portal-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  settings: {};

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.settings = AppConfig.settings.login;
    this.loginForm = this.formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  get f(): any { return this.loginForm.controls; }


  login(): void {

    this.store.dispatch( new appAction.LoginAction({
          action: appAction.LOGIN,
          username: this.f.username.value,
          password: this.f.password.value
        }));
  }

  register(): void {
    this.router.navigate(['/external/register']);
  }

  forgotPassword(): void {
    this.router.navigate(['/external/forgot-password']);
  }

}
