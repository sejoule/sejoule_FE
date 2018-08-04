import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconRegistry } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { LayoutsModule } from './layouts/layouts.module';

import { AppComponent } from './app.component';
import { APP_INITIALIZER } from '@angular/core';
import { SettingsService } from './services/config/settings.service';

import 'hammerjs';
import { AuthenticationService } from './services/authentication/authentication.service';
import { AlertService } from './services/alerts/alert.service';
import { UserService } from './services/users/user.service';
import { StoreModule } from '@ngrx/store';
import { reducers } from './middleware/reducers';
import { AuthenticationGuard } from './guards/authenticationGuard.component';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './middleware/effects/appEffects';
import { UserEffects } from './middleware/effects/userEffects';
import { FileUploadEffects } from './middleware/effects/fileUploadEffects';
import { FileuploadService } from './services/fileupload/fileupload.service';

export function initializeApp(appConfigService: SettingsService): any {
  return () => appConfigService.load();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AppEffects, UserEffects, FileUploadEffects]),
    BrowserModule,
    BrowserAnimationsModule,
    LayoutsModule,
    AppRoutingModule,
  ],
  providers: [
    SettingsService,
    { provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [SettingsService], multi: true
    }, AuthenticationService, AuthenticationGuard, AlertService, UserService, FileuploadService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  constructor(
      private matIconRegistry: MatIconRegistry,
      private sanitizer: DomSanitizer
    ) {
    // Register Font Awesome
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');

    // Register layout icon SVGs
    matIconRegistry.addSvgIcon('classic',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/classic.svg')
    );
    matIconRegistry.addSvgIcon('toolbar',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/toolbar.svg')
    );
    matIconRegistry.addSvgIcon('compact',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/compact.svg')
    );
    matIconRegistry.addSvgIcon('boxed',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/boxed.svg')
    );
    matIconRegistry.addSvgIcon('funky',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/funky.svg')
    );
    matIconRegistry.addSvgIcon('tabbed',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/tabbed.svg')
    );
  }
}
