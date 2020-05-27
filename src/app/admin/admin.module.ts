import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminComponent } from './admin.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { MaterialModule } from '../material/material.module';
import { ProjectCreateComponent } from './projects/project-create/project-create.component';
import { ProjectListComponent } from './projects/project-list/project-list.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { ProjectDetailsComponent } from './projects/project-details/project-details.component';
import { FileUploadComponent } from '../common/upload/file-upload/file-upload.component';
import { FileDownloadComponent } from '../common/download/file-download/file-download.component';
// import { UserEditComponent } from './users/user-edit/user-edit.component';

// import {RegistrationComponent} from '../registration/registration.component';
// import { AutocompleteComponent } from '../common/autocomplete/autocomplete.component';




@NgModule({
  declarations: [
    DashboardComponent,
    AdminComponent,
    TasksComponent,
    TaskCreateComponent,
    ProjectCreateComponent,
    ProjectListComponent,
    UserListComponent,
    ProjectDetailsComponent,
    FileUploadComponent,
    FileDownloadComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [FileUploadComponent]
})
export class AdminModule { }
