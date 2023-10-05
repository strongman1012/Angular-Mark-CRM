import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Route, RouterModule } from '@angular/router';
import { BackendApiModule } from 'app/backend-api/backend-api.module';
import { EditableTableComponent } from 'app/components/edit-tables.component';
import { OnlineRiskListComponent } from 'app/components/online-risk-list.component';
import { OnlineRoleListComponent } from 'app/components/online-role-list.component';
import { OnlineRuleListComponent } from 'app/components/online-rule-list.component';
import { OnlineUserListComponent } from 'app/components/online-user-list.component';
import { ProcessFormTemplate } from 'app/components/process-form';
import { TableComponent } from 'app/components/tables.component';
import { TableViewerComponent } from 'app/components/tables.viewer.component';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { UsersModule } from '../admin_2/riskAnalysis/users/users.module';
import { CentralUserReportComponent } from './central-users/central-user-report.component';
import { InactiveUsersJobsComponent } from './central-users/inactive-users/inactive-users-jobs.component';
import { LockParametersComponent } from './central-users/inactive-users/lock-parameters.component';
import { JobsComponent } from './central-users/jobs.component';
import { ScheduledTaskComponent } from './central-users/scheduled-tasks.component';

const routes: Route[] = [
  {
    path: 'scheduled-task',
    component: ScheduledTaskComponent,
  },
  {
    path: 'central-user-report',
    component: CentralUserReportComponent,
  },
  {
    path: 'jobs',
    component: JobsComponent,
  },
  {
    path: 'inactive-user/central-user-lock-parameters',
    component: LockParametersComponent,
  },
  {
    path: 'inactive-user/jobs',
    component: InactiveUsersJobsComponent,
  },
  
]

@NgModule({
  declarations: [
    ScheduledTaskComponent,
    CentralUserReportComponent,
    JobsComponent,
    LockParametersComponent,
    InactiveUsersJobsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableComponent,
    
    MatStepperModule,
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
    UsersModule,
    MatTabsModule,
    MenuModule,
    SharedModule,
    ButtonModule,
    TableModule,
    ProcessFormTemplate,
    OnlineRuleListComponent,
    OnlineUserListComponent,
    OnlineRoleListComponent,
    OnlineRiskListComponent,

    MatTabsModule,
    ChartModule,
    TableViewerComponent,
    PanelModule,
    FormsModule,
    InputTextModule,
    EditableTableComponent

  ],

})
export class CentralUsersDbModules {
}
