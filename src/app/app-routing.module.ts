import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AdminModule } from './admin/admin.module';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { UploadComponent } from './common/upload/upload.component';
import { FileUploadComponent } from './common/upload/file-upload/file-upload.component';
import { FileDownloadComponent } from './common/download/file-download/file-download.component';

const routes: Routes = [
  {
    path: '', component: LoginComponent,
  },
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule'
  },
  {
    path: 'admin/registration',
    component: RegistrationComponent
  },
  { path: 'upload', component: FileUploadComponent },
  // { path: 'upload', component: UploadComponent },

  { path: 'download', component: FileDownloadComponent },

  { path: '**', redirectTo: '/', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
