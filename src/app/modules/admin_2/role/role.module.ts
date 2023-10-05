import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RoleComponent} from './role.component';
import {Route, RouterModule} from '@angular/router';
import {MatRippleModule} from '@angular/material/core';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {TableModule} from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';
import {MenuModule} from 'primeng/menu';
import {ButtonModule} from 'primeng/button';
import {AddRoleComponent} from './add-role/add-role.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {SharedModule} from '../../../shared/shared.module';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {EditRoleComponent} from './edit-role/edit-role.component';
import {
  EditRoleOperationComponent
} from './edit-role-operation/edit-role-operation.component';
import {PickListModule} from 'primeng/picklist';

const routes: Route[] = [
  {
    path: '',
    component: RoleComponent,
  },
  {
    path: 'edit-role',
    component: EditRoleOperationComponent,
  },

];

@NgModule({
  declarations: [
    RoleComponent,
    AddRoleComponent,
    EditRoleComponent,
    EditRoleOperationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatRippleModule,
    MatMenuModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    TableModule,
    MultiSelectModule,
    MenuModule,
    ButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
    MatCheckboxModule,
    MatButtonModule,
    PickListModule,
  ],
})
export class RoleModule {
}
