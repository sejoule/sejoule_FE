import { NgModule } from '@angular/core';

import { routing } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';

import { ProfileComponent } from './profile/profile.component';
import { UploadComponent } from './upload/upload.component';
import { MatCodemirrorModule } from 'ngx-mat-codemirror';


@NgModule({
  imports: [
    routing,
    SharedModule, MatCodemirrorModule
  ],
  declarations: [
    ProfileComponent,
    UploadComponent
  ]
})
export class PagesModule { }
