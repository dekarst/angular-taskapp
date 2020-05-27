import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FileUploadModule } from 'ng2-file-upload';
import { ToastrModule } from 'ngx-toastr';

//components
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { ProgressSpinnerComponent } from './common/progress-spinner/progress-spinner.component';
import { RegistrationComponent } from './registration/registration.component';
import { NotificationComponent } from './common/notification/notification.component';

//material
import { MaterialModule } from './material/material.module';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

//directives
import { UniqueDirective } from './directives/unique.directive';

//interceptors
import { ApiInterceptor } from './http/interceptors/api.interceptor';

//services
import { ApiService } from './http/services/api.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AutocompleteComponent } from './common/autocomplete/autocomplete.component';
import { MultiselectComponent } from './common/multiselect/multiselect.component';
import { UploadComponent } from './common/upload/upload.component';
import { UploadService } from './common/upload/upload.service';
import { FileDownloadService } from './common/download/service/file-download.service';
import { UserUniqueService } from './registration/services/user-unique.service';
import { NotifyService } from './common/notification/services/notify.service';
import { ShareDataService } from './common/services/share-data.service';
// import { FileUploadComponent } from './common/upload/file-upload/file-upload.component';
// import { FileDownloadComponent } from './common/download/file-download/file-download.component';

export const BASE_URL = 'http://localhost:4200';
export const BASE_API_URL = "http://localhost:3000/";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UniqueDirective,
    ProgressSpinnerComponent,
    RegistrationComponent,
    AutocompleteComponent,
    MultiselectComponent,
    UploadComponent,
    NotificationComponent,
    NotificationComponent,
    // UniqueDirective
    // FileUploadComponent,
    // FileDownloadComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    FileUploadModule,
    ToastrModule.forRoot()
  ],
  // exports:[FileUploadComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { floatLabel: 'always' }
    },
    UploadService,
    FileDownloadService,
    NotifyService,
    ShareDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
