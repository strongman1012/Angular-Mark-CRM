import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { saveAs } from "file-saver";
import { RuleBookService } from "app/backend-api/rule-book.service";
import { OnlineRiskDetailComponent } from "app/modules/admin_2/riskAnalysis/online/risks/risk-detail/online-risk-detail.component";
import { OnlineRuleDetailComponent } from "app/modules/admin_2/riskAnalysis/online/rules/rule-detail/online-rule-detail.component";
import { NotificationService } from "app/shared/notification.service";
import { ConfirmationService, MenuItem } from "primeng/api";
import { catchError, Subject, takeUntil, tap, throwError } from "rxjs";
import { AddRisksComponent } from "./risks/add-risks/add-risks.component";
import { Router } from "@angular/router";
import { AddRulesToRiskComponent } from "./risks/add-rules-to-risk/add-rules-to-risk.component";
import { RiskDetailsComponent } from "./risks/risk-details/risk-details.component";

@Component({
  selector: "rules-component",
  template: `
    <div class="w-full mb-5">
      <app-table
        [title]="tableOneTitle"
        [cols]="mainCols"
        [data]="data"
        [actionButton]="true"
        [selectCheckBox]="true"
        [loading]="loading"
        [items]="RulesItems"
        [totalRecords]="totalRecords"
        [selectionMode]="selectionMode"
        [startingDisplayAmout]="startingDisplayAmout"
        [rowsPerPageOptions]="rowsPerPageOptions"
        (rowSelected)="onRowSelected($event)"
        (onPageChange)="onPageChanged($event)"
        (rowUnSelected)="onRowUnSelected($event)"
      ></app-table>
      <app-table
        class="pb-5"
        [title]="tableTwoTitle"
        [cols]="subCols"
        [data]="displaySelectionData"
        [loading]="loading"
        [totalRecords]="totalRecordRisk"
        [startingDisplayAmout]="startingDisplayAmoutRisk"
        [rowsPerPageOptions]="rowsPerPageOptions"
        [paginator]="true"
        [disableSortable]="true"
      ></app-table>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class RiskComponet implements AfterViewInit, OnInit {
  private encodeParams(params) {
    return encodeURIComponent(params);
  }

  private openDetail(data) {
    this.dialog.open(RiskDetailsComponent, {
      width: "75%",
      height: "750px",
      data: { riskId: data.id },
    });
    this.cdr.detectChanges();
  }
  private openRuleDetail(data) {
    this.dialog.open(OnlineRuleDetailComponent, {
      width: "60%",
      height: "750px",
      data: { ruleId: data.id },
    });
    this.cdr.detectChanges();
  }
  private subject = new Subject<boolean>();

  tableOneTitle = "Risks";
  tableTwoTitle = "Rules";
  selectionMode = "multiple";
  rowsPerPageOptions = [10, 20, 30, 50, 100, 150, 200];
  startingDisplayAmout = 10;
  firstRisk = 0;
  startingDisplayAmoutRisk = 10;
  filterRisk: any;
  sortOrderRisk = 1;
  sortFieldRisk: string;
  lazyEvent: string;
  lazyEventRules: string;
  data: [];
  riskId: number;
  loading: boolean;
  selectedRisk: any;
  selectedOptions: any;
  totalRecords: number;
  sortOrder = 1;
  sortField: string;
  filter: any;
  first = 0;
  rows = 10;
  totalRecordRisk: number;

  mainCols = [
    {
      field: "name",
      type: "text",
      header: "Risk ID",
      width: 200,
      color: "#008cf0",
      iconClass: "pi-angle-right",
      onClick: (data) => this.openDetail(data),
    },
    { field: "riskDescription", type: "text", header: "Description" },
    {
      field: "businessProcess",
      type: "text",
      header: "Business Process",
      subField: "name",
    },
    { field: "subProc", type: "text", header: "Sub Process", subField: "name" },
    { field: "riskType", type: "text", header: "Type", subField: "name" },
    {
      field: "crossSystem",
      type: "boolean",
      header: "Cross System",
      iconClass: {
        tr: "fa fa-link",
        fs: "fa fa-unlink",
      },
    },
    { field: "system-type", type: "text", header: "System Type" },
    { field: "riskConditionType", type: "text", header: "Condition" },
    {
      field: "enabled",
      type: "boolean",
      header: "Enabled",
    },
  ];
  subCols = [
    {
      field: "ruleName",
      type: "text",
      header: "Rule ID",
      color: "#008cf0",
      iconClass: "pi-angle-right",
      onClick: (data) => this.openRuleDetail(data),
    },
    { field: "ruleDescription", type: "text", header: "Description" },
    {
      field: "businessProcess",
      type: "text",
      header: "Business Process",
      subField: "name",
    },
    { field: "subProc", type: "text", header: "Sub Process", subField: "name" },
    { field: "ruleType", type: "text", header: "Type", subField: "name" },
    { field: "secondary", type: "text", header: "SAP System" },
  ];

  displaySelectionData = [];

  RulesItems: MenuItem[] = [
    {
      label: "Export",
      icon: "pi pi-file-excel",
      command: () => this.export(),
    },
    {
      label: "Add",
      icon: "pi pi-plus-circle",
      command: () => this.addRisk(),
    },
    {
      label: "Edit",
      icon: "pi pi-file-edit",
      command: () => this.editRisk(),
    },
    {
      label: "Delete",
      icon: "pi pi-trash",
      command: () => this.deleteRisk(),
    },
    {
      label: "Enable",
      icon: "fa  fa-dot-circle-o",
      command: () => this.enableRisk(),
    },
    {
      label: "Disable",
      icon: "fa fa-circle-o",
      command: () => this.disableRisk(),
    },
    {
      label: "Add Rules to Risk",
      icon: "fa fa-plus-square-o",
      command: () => this.addRulesToRisk(),
    },
    {
      label: "Consistensy Check",
      icon: "fa fa-check-circle-o",
      command: () => this.checkConsistensy(),
    },
  ];

  title = "communication test";
  /**
   * Constructor
   */
  constructor(
    private _formBuilder: FormBuilder,
    private ruleBookService: RuleBookService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    const filter = {
      ruleName: [{ value: null, matchMode: "contains", operator: "and" }],
      description: [{ value: null, matchMode: "contains", operator: "and" }],
      hostName: [{ value: null, matchMode: "contains", operator: "and" }],
      userName: [{ value: null, matchMode: "contains", operator: "and" }],
      clientNumber: [{ value: null, matchMode: "contains", operator: "and" }],
      sysNr: [{ value: null, matchMode: "contains", operator: "and" }],
      languageCode: [{ value: null, matchMode: "contains", operator: "and" }],
      sid: [{ value: null, matchMode: "contains", operator: "and" }],
    };
    this.filter = this.encodeParams(JSON.stringify(filter));
  }

  ngOnInit(): void {
    this.getRisksData();
  }

  onPageChanged(event) {
    this.first = event.first;
    this.startingDisplayAmout = event.rows;
    this.getRisksData();
  }

  getRisksData() {
    this.loading = true;
    this.sortField = "name";
    setTimeout(() => {
      this.ruleBookService
        .getRisks(
          this.first,
          this.startingDisplayAmout,
          this.sortOrder,
          this.sortField,
          this.filter
        )
        .pipe(
          tap((res) => {
            this.data = res.data.rows;
            this.totalRecords = res.data.records;
            this.loading = false;
          }),
          takeUntil(this.subject)
        )
        .subscribe();
    }, 10);
  }

  getDisplaySelectionData(filter, riskId) {
    this.loading = true;
    this.sortFieldRisk = "ruleName";
    setTimeout(() => {
      this.ruleBookService
        .getRiskRules(
          this.firstRisk,
          this.startingDisplayAmoutRisk,
          this.sortOrderRisk,
          this.sortFieldRisk,
          filter,
          riskId
        )
        .subscribe((res) => {
          this.displaySelectionData = res.data.rows;
          this.totalRecordRisk = res.data.records;
          this.loading = false;
        });
    }, 5);
  }

  onRowSelected(selectedRow: any) {
    this.selectedRisk = selectedRow;
    this.riskId = selectedRow.id;
    this.getDisplaySelectionData(this.filter, this.riskId);
  }

  onRowUnSelected(unSelectedRow: any) {
    this.displaySelectionData = [];
  }

  export() {
    this.ruleBookService.getExportRisk().subscribe((res) => {
      const blob = new Blob([res], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const filename = "RiskDetails.xlsx";
      this.saveExcelFile(blob, filename);
      this.notificationService.success("Success download RiskDetails");
    });
  }

  saveExcelFile(blob: Blob, filename: string): void {
    saveAs(blob, filename);
  }
  private checkRiskSelected() {
    if (!this.selectedRisk) {
      this.notificationService.error("Please select a risk for editing");
      throw Error("Please select a risk for editing");
    }
  }

  addRisk() {
    this.selectedRisk = null;
    this.ruleBookService.getAddRiskRequired().subscribe((res) => {
      this.selectedOptions = res.data;
      this.addOrUpdateRisk(this.selectedOptions);
    });
  }

  editRisk() {
    this.checkRiskSelected();
    this.ruleBookService
      .getEditRiskRequired(this.selectedRisk.id)
      .subscribe((res) => {
        this.selectedOptions = res.data;
        this.addOrUpdateRisk(this.selectedOptions);
      });
  }

  private addOrUpdateRisk(selectedOptions) {
    const dialogRef = this.dialog.open(AddRisksComponent, {
      width: "60%",
      data: { risk: this.selectedRisk, selectedOptions: selectedOptions },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getRisksData();
      }
    });
  }

  deleteRisk() {
    this.checkRiskSelected();
    this.confirmationService.confirm({
      message: "Do you want to remove selected risk?",
      accept: () => {
        this.ruleBookService
          .riskDelete(this.riskId)
          .pipe(
            tap((res) => {
              this.notificationService.show(res);
              this.getRisksData();
            }),
            catchError((err) => {
              this.notificationService.show(err.data.message);
              return throwError(() => err);
            }),
            takeUntil(this.subject)
          )
          .subscribe();
      },
    });
  }

  enableRisk() {
    this.checkRiskSelected();
    this.ruleBookService
      .riskEnable(this.riskId)
      .pipe(
        tap((res) => {
          this.notificationService.show(res);
        }),
        catchError((err) => {
          this.notificationService.show(err.data.message);
          return throwError(() => err);
        }),
        takeUntil(this.subject)
      )
      .subscribe();
  }

  disableRisk() {
    this.checkRiskSelected();
    this.ruleBookService
      .riskDisable(this.riskId)
      .pipe(
        tap((res) => {
          this.notificationService.show(res);
        }),
        catchError((err) => {
          this.notificationService.show(err.data.message);
          return throwError(() => err);
        }),
        takeUntil(this.subject)
      )
      .subscribe();
  }

  addRulesToRisk() {
    this.checkRiskSelected();
    const dialogRef = this.dialog.open(AddRulesToRiskComponent, {
      width: "85%",
      height: "90%",
      data: {
        selectedRiskData: this.selectedRisk,
        selectedRuleData: this.displaySelectionData,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getDisplaySelectionData(this.filter, this.riskId);
      }
    });
  }

  checkConsistensy() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`acm/rule-book/checkConsistensy`])
    );

    window.open(url, "_blank");
  }

  ngAfterViewInit() {}

  openDialog() {}
}
