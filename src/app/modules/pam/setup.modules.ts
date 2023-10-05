import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { UsersModule } from '../admin_2/riskAnalysis/users/users.module';
import { JobsComponent } from './setup/jobs.component';
import { PrivalegesComponent } from './setup/privileges.component';
import { ReasonComponent } from './setup/reason.component';
import { ReviewRuleComponent } from './setup/review-rule.component';
import { SchedulersComponent } from './setup/schedulers.component';

const routes: Route[] = [
  {
    path: 'privileges',
    component: PrivalegesComponent,
  },
  {
    path: 'review-rule',
    component: ReviewRuleComponent,
  },
  {
    path: 'reasons',
    component: ReasonComponent,
  },
  {
    path: 'synchronize/jobs',
    component: JobsComponent,
  },
  {
    path: 'synchronize/schedulers',
    component: SchedulersComponent,
  },
  
]

@NgModule({
  declarations: [
    PrivalegesComponent,
    ReviewRuleComponent,
    ReasonComponent,
    SchedulersComponent,
    JobsComponent
    // LicenseRulesComponent
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
    EditableTableComponent
  ],

})
export class SetupModule {
}
