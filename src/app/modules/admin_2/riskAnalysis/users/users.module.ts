import {NgModule} from '@angular/core';
import {UserListComponent} from './userList/user-list.component';
import {UsersComponent} from './users.component';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import {MatRippleModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {CommonModule} from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MenuModule} from 'primeng/menu';
import {ButtonModule} from 'primeng/button';

@NgModule({
  declarations: [
    UsersComponent,
    UserListComponent,
  ],
  exports: [
    UsersComponent,
  ],
  imports: [
    MatTableModule,
    MatMenuModule,
    MatRippleModule,
    MatIconModule,
    MatPaginatorModule,
    CommonModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MenuModule,
    ButtonModule,
  ],
})
export class UsersModule {
}
