import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LdapTitleComponent } from './ldap-title.component';
import {Route, RouterModule} from '@angular/router';
import {RoleComponent} from '../role.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {MenuModule} from 'primeng/menu';
import { AddLdapTitleComponent } from './add-ldap-title/add-ldap-title.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {SharedModule} from '../../../../shared/shared.module';
import {PickListModule} from 'primeng/picklist';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {
  EditLdapTitleComponent
} from './edit-ldap-title/edit-ldap-title.component';
import {MultiSelectModule} from 'primeng/multiselect';

const routes: Route[] = [
  {
    path: '',
    component: LdapTitleComponent,
  },

];

@NgModule({
  declarations: [
    LdapTitleComponent,
    AddLdapTitleComponent,
    EditLdapTitleComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableModule,
    ButtonModule,
    MenuModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    SharedModule,
    PickListModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MultiSelectModule,
  ],
})
export class LdapTitleModule { }
