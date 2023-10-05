import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { RiskAnalysisComponent } from "app/modules/admin_2/riskAnalysis/risk-analysis.component";
import { MatStepperModule } from "@angular/material/stepper";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatTableModule } from "@angular/material/table";
import { LoadSelectionComponent } from "./loadSelection/load-selection.component";
import { MatDialogModule } from "@angular/material/dialog";
import { BackendApiModule } from "../../../backend-api/backend-api.module";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatMenuModule } from "@angular/material/menu";
import { MatRippleModule } from "@angular/material/core";

import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { UsersModule } from "./users/users.module";
import { MatTabsModule } from "@angular/material/tabs";
import { RiskAnalysisOnlineComponent } from "./online/risk-analysis-online.component";
import { PreSelectionComponent } from "./online/pre-selection/pre-selection.component";
import { OnlineUserListComponent } from "./online/users/user-list/online-user-list.component";

import { MenuModule } from "primeng/menu";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { OnlineUserSelectListComponent } from "./online/users/select-users/online-user-select-list.component";
import { OnlineUserDetailComponent } from "./online/users/user-detail/online-user-detail.component";
import { SharedModule } from "../../../shared/shared.module";

import { OnlineRuleListComponent } from "./online/rules/rule-list/online-rule-list.component";
import { OnlineRuleDetailComponent } from "./online/rules/rule-detail/online-rule-detail.component";
import { OnlineRuleSelectionListComponent } from "./online/rules/select-rules/online-rule-selection-list.component";
import { OnlineRoleListComponent } from "./online/roles/role-list/online-role-list.component";
import { OnlineRoleSelectListComponent } from "./online/roles/select-roles/online-role-select-list.component";
import { OnlineRoleDetailComponent } from "./online/roles/role-detail/online-role-detail.component";
import { OnlineRiskSelectionListComponent } from "./online/risks/select-risks/online-risk-selection-list.component";
import { OnlineRiskDetailComponent } from "./online/risks/risk-detail/online-risk-detail.component";
import { OnlineRiskListComponent } from "./online/risks/risk-list/online-risk-list.component";
import { RiskAnalysisOnlineSummaryComponent } from "./online/summary/risk-analysis-online-summary.component";
import { RiskAnalysisOnlineSummaryDetailComponent } from "./online/summary/detail/risk-analysis-online-summary-detail.component";
import { RiskAnalysisOnlineSummaryViolationResultComponent } from "./online/summary/violationResults/risk-analysis-online-summary-violation-result.component";
import { RiskAnalysisOnlineSummarySummaryComponent } from "./online/summary/summary/risk-analysis-online-summary-summary.component";
import { random } from "lodash";
import { CrossSystemAnalysis } from "app/modules/acm/riskAnalysis/cross-system-analysis/cross-system-analysis.component";

const routes: Route[] = [
  {
    path: "online/:id",
    component: RiskAnalysisOnlineComponent,
  },
  {
    path: "online-users-select",
    component: OnlineUserSelectListComponent,
  },
  {
    path: "online-role-detail",
    component: OnlineUserDetailComponent,
  },
  {
    path: "cross-system-analysis/:id",
    component: CrossSystemAnalysis,
  },

  {
    path: "",
    component: RiskAnalysisComponent,
  },
];

@NgModule({
  declarations: [
    RiskAnalysisComponent,
    LoadSelectionComponent,
    RiskAnalysisOnlineComponent,
    PreSelectionComponent,
    OnlineUserListComponent,
    OnlineUserSelectListComponent,
    OnlineUserDetailComponent,
    OnlineRuleListComponent,
    OnlineRuleDetailComponent,
    OnlineRuleSelectionListComponent,
    OnlineRoleListComponent,
    OnlineRoleSelectListComponent,
    OnlineRoleDetailComponent,
    OnlineRiskListComponent,
    OnlineRiskDetailComponent,
    OnlineRiskSelectionListComponent,
    RiskAnalysisOnlineSummaryComponent,
    RiskAnalysisOnlineSummaryDetailComponent,
    RiskAnalysisOnlineSummaryViolationResultComponent,
    RiskAnalysisOnlineSummarySummaryComponent,
  ],

  imports: [
    RouterModule.forChild(routes),
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
  ],
  exports: [],
})
export class RiskAnalysisModule {}
