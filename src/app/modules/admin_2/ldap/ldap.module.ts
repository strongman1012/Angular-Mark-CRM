import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { LandingComponent } from '../landing/landing.component';
import { LdapComponent } from './ldap.component';
import { MatTabsModule } from '@angular/material/tabs';
import {
  LdapConfigurationComponent,
} from './configuration/ldap-configuration.component';
import { LogComponent } from './log/log.component';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { AddLdapComponent } from './add-ldap/add-ldap.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from '../../../shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PickListModule } from 'primeng/picklist';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormComponent } from 'app/components/form';
import { ToastModule } from 'primeng/toast';

const routes: Route[] = [
  {
    path: '',
    component: LdapComponent,
  },
  {
    path: 'add',
    component: AddLdapComponent,
  },

];

@NgModule({
  declarations: [
    LdapComponent,
    LdapConfigurationComponent,
    LogComponent,
    AddLdapComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    TableModule,
    MultiSelectModule,
    MenuModule,
    ButtonModule,
    CardModule,
    MatDialogModule,

    MatFormFieldModule,
    SharedModule,
    MatInputModule,
    MatSelectModule,
    PickListModule,
    MatButtonModule,
    MatCheckboxModule,
    FormComponent,
    ToastModule,
    RouterModule,
  ],

})
export class LdapModule {
}
