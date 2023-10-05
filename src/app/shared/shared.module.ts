import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IsFieldInvalidPipe} from './is-field-invalid.pipe';
import {
  ConfirmPasswordValidationPipe,
} from './confirm-password-validation.pipe';

import {ValidationPipe} from './validation.pipe';
import {FormErrorComponent} from './form-error/form-error.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
  FormErrorConfirmPasswordComponent,
} from './form-error-confirm-password/form-error-confirm-password.component';
import { CustomPrimeTableComponent } from './custom-prime-table/custom-prime-table.component';
import { CustomPrimeTableStaticComponent } from './custom-prime-table-static/custom-prime-table-static.component';
import { TableModule } from 'primeng/table';
import { MatDialogModule } from '@angular/material/dialog';
import {CustomDialogComponent} from './custom-dialog/custom-dialog.component';
import {MatButtonModule} from '@angular/material/button';
import {CustomListComponent} from './custom-list/custom-list.component';
import {MenuModule} from 'primeng/menu';
import {ButtonModule} from 'primeng/button';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    TableModule,
    MatDialogModule,
    MatButtonModule,
    MenuModule,
    ButtonModule,
  ],
  declarations: [
    ValidationPipe,
    IsFieldInvalidPipe,
    ConfirmPasswordValidationPipe,
    FormErrorComponent,
    FormErrorConfirmPasswordComponent,
    CustomPrimeTableComponent,
    CustomPrimeTableStaticComponent,
    CustomDialogComponent,
    CustomListComponent,

  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ValidationPipe,
    IsFieldInvalidPipe,
    ConfirmPasswordValidationPipe,
    FormErrorComponent,
    FormErrorConfirmPasswordComponent,
    CustomPrimeTableComponent,
    CustomPrimeTableStaticComponent,
    CustomDialogComponent,
    CustomListComponent,

  ],
})
export class SharedModule {
}
