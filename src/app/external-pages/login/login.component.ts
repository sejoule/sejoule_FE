import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsService } from '../../services/config/settings.service';
import { AlertService } from '../../services/alerts/alert.service';
import * as userAction from '../../middleware/actions/userActions';
import { Store } from '@ngrx/store';
import { AppState } from '../../middleware/reducers';


@Component({
  selector: 'portal-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  application_name:  any;
  welcome1:  '';
  welcome2:  '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService,
    private store: Store<AppState>,
    private settings: SettingsService
  ) { }

  ngOnInit(): void {
    this.application_name = this.settings.getSettings().application_name;
    this.welcome1 = this.settings.getAppText().welcome1;
    this.welcome2 = this.settings.getAppText().welcome2;

    this.loginForm = this.formBuilder.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  get f(): any { return this.loginForm.controls; }


  login(): void {
    this.store.dispatch( new userAction.LoginAction({
          username: this.f.username.value,
          password: this.f.password.value
        })
    );
  }

  register(): void {
    this.router.navigate(['/external/register']);
  }

  forgotPassword(): void {
    this.router.navigate(['/external/forgot-password']);
  }

}
