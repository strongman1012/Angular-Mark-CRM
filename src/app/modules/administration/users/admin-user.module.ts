import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {MatStepperModule} from '@angular/material/stepper';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';

import {MatDialogModule} from '@angular/material/dialog';
import {BackendApiModule} from '../../../backend-api/backend-api.module';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {CommonModule} from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatMenuModule} from '@angular/material/menu';
import {MatRippleModule} from '@angular/material/core';
import {TableModule as PrimeTableModule} from 'primeng/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

import {MatTabsModule} from '@angular/material/tabs';
import {UserComponent} from './user.component';
import {MenuModule} from 'primeng/menu';
import {ButtonModule} from 'primeng/button';
import {StyleClassModule} from 'primeng/styleclass';
import {InputTextModule} from 'primeng/inputtext';
import {AddUserComponent} from './add-user/add-user.component';
import {SharedModule} from '../../../shared/shared.module';
import {MessagesModule} from 'primeng/messages';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {PasswordResetComponent} from './password-reset/password-reset.component';
import {UserReportingUnitComponent} from './user-reporting-unit/user-reporting-unit.component';
import {PickListModule} from 'primeng/picklist';
import { UserRoleComponent } from './user-role/user-role.component';

const routes: Route[] = [
    {
        path: '',
        component: UserComponent
    },
    {
        path: 'reporting-units',
        component: UserReportingUnitComponent
    }
];

@NgModule({
    declarations: [
        UserComponent,
        AddUserComponent,
        PasswordResetComponent,
        UserReportingUnitComponent,
        UserRoleComponent,

    ],

    imports: [
        RouterModule.forChild(routes),
        MatStepperModule,
        PrimeTableModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatPaginatorModule,
        MatTableModule,
        MatDialogModule,
        BackendApiModule,
        MatSelectModule,
        MatIconModule,
        CommonModule,
        MatCheckboxModule,
        MatMenuModule,
        MatRippleModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        MenuModule,
        ButtonModule,
        StyleClassModule,
        InputTextModule,
        SharedModule,
        MessagesModule,
        ToastModule,
        ConfirmDialogModule,
        PickListModule,

    ]
})
export class AdminUserModule {
}
