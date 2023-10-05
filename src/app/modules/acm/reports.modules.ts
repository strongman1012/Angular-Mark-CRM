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
import { CrossSystemAnalysis } from './reports/cross-system-analysis.component';
import { SodResultsComponent } from './reports/sod-results.component';
import { OrgLevelAnalysis } from './reports/org-level-analysis';
import { RiskExeSummary } from './reports/risk-exe-summary';
import { DropdownModule } from 'primeng/dropdown';
import { OrgAnalysisDashboard } from './reports/org-analysis-dashboard.component';
import { UserReportComponent } from './reports/user-report.component';
import { PanelModule } from 'primeng/panel';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { RiskExecutionComponent } from './reports/risk-execution.component';
import { RuleExecutionComponent } from './reports/rule-execution.component';
import { TcodeExecutionComponent } from './reports/tcode-execution.component';

const routes: Route[] = [
  {
    path: 'sod-results',
    component: SodResultsComponent,
  },
  {
    path: 'cross-system-analysis',
    component: CrossSystemAnalysis,
  },
  {
    path: 'org-level-analysis',
    component: OrgLevelAnalysis,
  },
  {
    path: 'risk-exe-summary',
    component: RiskExeSummary,
  },
  {
    path: 'org-analysis-dashboard',
    component: OrgAnalysisDashboard,
  },
  {
    path: 'user-report',
    component: UserReportComponent,
  },
  {
    path: 'risk-execution',
    component: RiskExecutionComponent,
  },
  {
    path: 'rule-execution',
    component: RuleExecutionComponent,
  },
  {
    path: 'tcode-execution',
    component: TcodeExecutionComponent,
  },
  {
    path: 'risk-exe-summary',
    component: RiskExeSummary,
  },
  
]

@NgModule({
  declarations: [
    SodResultsComponent,
    CrossSystemAnalysis,
    OrgLevelAnalysis,
    RiskExeSummary,
    OrgAnalysisDashboard,
    UserReportComponent,
    RiskExecutionComponent,
    RuleExecutionComponent,
    TcodeExecutionComponent,
    RiskExeSummary
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
    DropdownModule,
    PanelModule,
    FormsModule,
    CheckboxModule,
    InputTextModule

  ],

})
export class ReportsComponent {
}
