import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { UploadComponent } from './upload/upload.component';

import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [{
  path: 'profile',
  component: ProfileComponent,
  data: {
    title: 'Profile'
  }
  },
  {
    path: 'upload',
    component: UploadComponent
    
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
