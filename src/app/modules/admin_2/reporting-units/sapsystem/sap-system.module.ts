import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';

import {SapsystemComponent} from './sapsystem.component';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {MenuModule} from 'primeng/menu';
import {AddSapSystemComponent} from './add-sapsystem/add-sap-system.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';

import {MultiSelectModule} from 'primeng/multiselect';
import {SharedModule} from '../../../../shared/shared.module';
import {FuseCardModule} from '../../../../../@fuse/components/card';

const routes: Route[] = [
  {
    path: '',
    component: SapsystemComponent,
  },
  {
    path: 'add',
    component: AddSapSystemComponent,
  },
];

@NgModule({
  declarations: [
    SapsystemComponent,
    AddSapSystemComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableModule,
    InputTextModule,
    ButtonModule,
    MenuModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    SharedModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSelectModule,
    FuseCardModule,
    MultiSelectModule,
  ],
})
export class SapSystemModule {
}
