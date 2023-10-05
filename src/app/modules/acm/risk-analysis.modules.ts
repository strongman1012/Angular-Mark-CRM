import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatRippleModule } from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from "@angular/material/select";
import { MatStepperModule } from "@angular/material/stepper";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { Route, RouterModule } from "@angular/router";
import { BackendApiModule } from "app/backend-api/backend-api.module";
import { OnlineRiskListComponent } from "app/components/online-risk-list.component";
import { OnlineRoleListComponent } from "app/components/online-role-list.component";
import { OnlineRuleListComponent } from "app/components/online-rule-list.component";
import { OnlineUserListComponent } from "app/components/online-user-list.component";
import { ProcessFormTemplate } from "app/components/process-form";
import { TableComponent } from "app/components/tables.component";
import { TableViewerComponent } from "app/components/tables.viewer.component";
import { SharedModule } from "app/shared/shared.module";
import { ButtonModule } from "primeng/button";
import { ChartModule } from "primeng/chart";
import { CheckboxModule } from "primeng/checkbox";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { MenuModule } from "primeng/menu";
import { PanelModule } from "primeng/panel";
import { TableModule } from "primeng/table";
import { LoadSelectionComponent } from "../admin_2/riskAnalysis/loadSelection/load-selection.component";
import { OnlineRoleSelectListComponent } from "../admin_2/riskAnalysis/online/roles/select-roles/online-role-select-list.component";
import { OnlineRuleDetailComponent } from "../admin_2/riskAnalysis/online/rules/rule-detail/online-rule-detail.component";
import { OnlineRiskDetailComponent } from "../admin_2/riskAnalysis/online/risks/risk-detail/online-risk-detail.component";
import { OnlineRuleSelectionListComponent } from "../admin_2/riskAnalysis/online/rules/select-rules/online-rule-selection-list.component";
import { RiskAnalysisOnlineSummaryDetailComponent } from "../admin_2/riskAnalysis/online/summary/detail/risk-analysis-online-summary-detail.component";
import { RiskAnalysisOnlineSummaryComponent } from "../admin_2/riskAnalysis/online/summary/risk-analysis-online-summary.component";
import { RiskAnalysisOnlineSummarySummaryComponent } from "../admin_2/riskAnalysis/online/summary/summary/risk-analysis-online-summary-summary.component";
import { RiskAnalysisOnlineSummaryViolationResultComponent } from "../admin_2/riskAnalysis/online/summary/violationResults/risk-analysis-online-summary-violation-result.component";
import { OnlineUserSelectListComponent } from "../admin_2/riskAnalysis/online/users/select-users/online-user-select-list.component";
import { OnlineUserDetailComponent } from "../admin_2/riskAnalysis/online/users/user-detail/online-user-detail.component";
import { RiskAnalysisComponent } from "../admin_2/riskAnalysis/risk-analysis.component";
import { UsersModule } from "../admin_2/riskAnalysis/users/users.module";
import { ACMDashboardComponent } from "./acm-dashboard/acm-dashboard.component";
import { CrossSystemAnalysis1 } from "./riskAnalysis/cross-system-analysis/cross-system-analysis-1.component";
import { CrossSystemAnalysis } from "./riskAnalysis/cross-system-analysis/cross-system-analysis.component";
import { ScheduledAnalysisComponent } from "./riskAnalysis/dashboard/scheduled-analysis.component";
import { ImpactAnalysisComponent } from "./riskAnalysis/impact-analysis/impact-analysis.component";
import { SuccessFactorAnaylsis } from "./riskAnalysis/non-abap/success-factors-analysis.component";
import { OfflineComponent } from "./riskAnalysis/offline/offline.component";
import { TasksComponent } from "./riskAnalysis/offline/task.component";
import { UserBrowserComponent } from "./riskAnalysis/offline/user-browser.component";
import { UserVariantComponent } from "./riskAnalysis/offline/user-variant.component";
import { PreSelectionComponent } from "./riskAnalysis/online/pre-selection/pre-selection.component";
import { RiskAnalysisOnlineComponent } from "./riskAnalysis/online/risk-analysis-online.component";
import { PositionIdAnalysis } from "./riskAnalysis/position-id/position-id-analysis.component";
import { SimulationOnlineComponent } from "./riskAnalysis/simulation/online/simulation-online.component";

const routes: Route[] = [
  {
    path: "online/:id",
    component: RiskAnalysisOnlineComponent,
  },
  {
    path: "offline/user-browser",
    component: UserBrowserComponent,
  },
  {
    path: "offline/user-variant",
    component: UserVariantComponent,
  },
  {
    path: "offline/sod-analysis",
    component: OfflineComponent,
  },
  {
    path: "offline/tasks",
    component: TasksComponent,
  },
  {
    path: "impact-analysis",
    component: ImpactAnalysisComponent,
  },
  {
    path: "simulation/online/:id",
    component: SimulationOnlineComponent,
  },
  {
    path: "simulation/offline/:id",
    component: SimulationOnlineComponent,
  },
  {
    path: "position-id/analyisis/:id",
    component: PositionIdAnalysis,
  },
  {
    path: "cross-system-analysis/:id",
    component: CrossSystemAnalysis,
  },
  {
    path: "cross-system-analysis1/:id",
    component: CrossSystemAnalysis1,
  },
  {
    path: "dashboard",
    component: ScheduledAnalysisComponent,
  },
  {
    path: "sfAnalysis/:id",
    component: SuccessFactorAnaylsis,
  },
];

@NgModule({
  declarations: [
    RiskAnalysisComponent,
    LoadSelectionComponent,
    RiskAnalysisOnlineComponent,
    PreSelectionComponent,
    OnlineUserSelectListComponent,
    OnlineUserDetailComponent,
    OnlineRuleDetailComponent,
    OnlineRiskDetailComponent,
    OnlineRuleSelectionListComponent,
    OnlineRoleSelectListComponent,
    SimulationOnlineComponent,
    RiskAnalysisOnlineSummaryComponent,
    RiskAnalysisOnlineSummaryDetailComponent,
    RiskAnalysisOnlineSummaryViolationResultComponent,
    RiskAnalysisOnlineSummarySummaryComponent,
    PositionIdAnalysis,
    CrossSystemAnalysis,
    CrossSystemAnalysis1,
    SuccessFactorAnaylsis,
    OfflineComponent,
    TasksComponent,
    ImpactAnalysisComponent,
    ScheduledAnalysisComponent,
    UserBrowserComponent,
    UserVariantComponent,
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
    FormsModule,
    CheckboxModule,
    InputTextModule,
  ],
})
export class RiskAnalysisModule {}
