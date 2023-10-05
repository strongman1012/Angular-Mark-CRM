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
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { UsersModule } from '../admin_2/riskAnalysis/users/users.module';
import { AcmOwnersComponent } from './master-data/acm-owners';
import { BusinessProcessComponent } from './master-data/business-process.component';
import { BusinessSubProcessComponent } from './master-data/business-sub-process.component';
import { MCControlComponent } from './master-data/mc-control.component';
import { OrgFieldComponent } from './master-data/org-field.component';
import { OrgNamesComponent } from './master-data/org-names.component';
import { RiskTypeComponent } from './master-data/risk-type.component';
import { RuleTypeComponent } from './master-data/rule-type.component';

const routes: Route[] = [
  {
    path: 'business-processes',
    component: BusinessProcessComponent,
  },
  {
    path: 'business-sub-processes',
    component: BusinessSubProcessComponent,
  },
  {
    path: 'business-sub-processes',
    component: BusinessSubProcessComponent,
  },
  {
    path: 'risk-type',
    component: RiskTypeComponent,
  },
  {
    path: 'rule-type',
    component: RuleTypeComponent,
  },
  {
    path: 'mitigations/mc-control',
    component: MCControlComponent,
  },
  {
    path: 'org-field/org-fields',
    component: OrgFieldComponent,
  },
  {
    path: 'org-field/org-names',
    component: OrgNamesComponent,
  },
  {
    path: 'acm-owners',
    component: AcmOwnersComponent,
  },
  
]

@NgModule({
  declarations: [
    BusinessProcessComponent,
    BusinessSubProcessComponent,
    RiskTypeComponent,
    RuleTypeComponent,
    MCControlComponent,
    OrgFieldComponent,
    OrgNamesComponent,
    AcmOwnersComponent

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
    DropdownModule,
    FormsModule
  ],

})
export class BusinessProcessModule {
}
