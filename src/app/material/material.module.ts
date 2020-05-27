import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FileUploadModule } from 'ng2-file-upload';

const usedModules = [
  CommonModule,
  MatButtonModule,
  MatCardModule,
  MatSelectModule,
  MatSliderModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatCheckboxModule,
  MatRadioModule,
  MatAutocompleteModule,
  MatIconModule,
  NgSelectModule,
  MatToolbarModule,
  MatProgressBarModule,
  FileUploadModule
]
@NgModule({
  declarations: [],
  imports: usedModules,
  exports: usedModules
})
export class MaterialModule { }
