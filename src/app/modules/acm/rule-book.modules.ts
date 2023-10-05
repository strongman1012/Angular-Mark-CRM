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
import { EditableTableComponent } from "app/components/edit-tables.component";
import { SharedModule } from "app/shared/shared.module";
import { AutoCompleteModule } from "primeng/autocomplete";
import { ButtonModule } from "primeng/button";
import { ChartModule } from "primeng/chart";
import { CheckboxModule } from "primeng/checkbox";
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from "primeng/inputtext";
import { MenuModule } from "primeng/menu";
import { PanelModule } from "primeng/panel";
import { TableModule } from "primeng/table";
import { UsersModule } from "../admin_2/riskAnalysis/users/users.module";
import { AuditLogsRisksComponent } from "./rule-book/audit-logs/risks";
import { AuditLogsRulesComponent } from "./rule-book/audit-logs/rules";
import { RiskComponet } from "./rule-book/risks";
import { RulesComponent } from "./rule-book/rules";
import { AddRuleComponent } from "./rule-book/rules/add-rule/add-rule.component";
import { AddRisksComponent } from "./rule-book/risks/add-risks/add-risks.component";
import { ConsistensyComponent } from "./rule-book/risks/consistensy.component";
import { CardModule } from "primeng/card";
import { AddRulesToRiskComponent } from "./rule-book/risks/add-rules-to-risk/add-rules-to-risk.component";
import { ImportRulesComponent } from "./rule-book/import/import-rules/import-rules.component";
import { ImportRiskComponent } from "./rule-book/import/import-risk/import-risk.component";
import { VariantRulesComponent } from "./rule-book/variant/variant-rules/variant-rules.component";
import { VariantRisksComponent } from "./rule-book/variant/variant-risks/variant-risks.component";
import { MultiSelectModule } from "primeng/multiselect";
import { RiskDetailsComponent } from "./rule-book/risks/risk-details/risk-details.component";
import { FilterComponent } from "./rule-book/rules/filter/filter.component";
import { RuleSearchComponent } from "./rule-book/rules/rule-search/rule-search.component";

const routes: Route[] = [
  {
    path: "rules",
    component: RulesComponent,
  },
  {
    path: "risk",
    component: RiskComponet,
  },
  {
    path: "checkConsistensy",
    component: ConsistensyComponent,
  },
  {
    path: "variant/risk",
    component: VariantRisksComponent,
  },
  {
    path: "variant/rules",
    component: VariantRulesComponent,
  },
  {
    path: "import/rules",
    component: ImportRulesComponent,
  },
  {
    path: "import/risk",
    component: ImportRiskComponent,
  },
  {
    path: "audit-logs/risk",
    component: AuditLogsRisksComponent,
  },
  {
    path: "audit-logs/rules",
    component: AuditLogsRulesComponent,
  },
];

@NgModule({
  declarations: [
    RulesComponent,
    RiskComponet,
    VariantRulesComponent,
    VariantRisksComponent,
    AddRuleComponent,
    AddRisksComponent,
    RiskDetailsComponent,
    ConsistensyComponent,
    ImportRulesComponent,
    ImportRiskComponent,
    AuditLogsRisksComponent,
    AuditLogsRulesComponent,
    FilterComponent,
    AddRulesToRiskComponent,
    RuleSearchComponent,
  ],

  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableComponent,
    TableViewerComponent,
    EditableTableComponent,

    MatStepperModule,
    ReactiveFormsModule,
    CardModule,
    MultiSelectModule,
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
    AutoCompleteModule,
    FormsModule,
    PanelModule,
    DropdownModule,
    CheckboxModule,
    InputTextModule,
    ButtonModule,
  ],
})
export class RuleBookModule {}
