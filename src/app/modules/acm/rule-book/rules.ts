import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { catchError, Subject, takeUntil, tap, throwError } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { RuleBookService } from "app/backend-api/rule-book.service";
import { OnlineRuleDetailComponent } from "app/modules/admin_2/riskAnalysis/online/rules/rule-detail/online-rule-detail.component";
import { ConfirmationService, MenuItem } from "primeng/api";
import { saveAs } from "file-saver";
import { NotificationService } from "app/shared/notification.service";
import { AddRuleComponent } from "./rules/add-rule/add-rule.component";
import { RuleSearchComponent } from "./rules/rule-search/rule-search.component";
@Component({
  selector: "rules-component",
  template: `
    <div class="w-full mb-5">
      <app-table
        [title]="tableOneTitle"
        [cols]="mainCols"
        [data]="data"
        [items]="rulesItems"
        [actionButton]="true"
        [loading]="loading"
        [selectedAll]="selectedAll"
        (selectedAllChange)="onSelectedAllChange($event)"
        [totalRecords]="totalRecords"
        [selectCheckBox]="true"
        [selectionMode]="selectionMode"
        [displaySearch]="displaySearch"
        [startingDisplayAmout]="startingDisplayAmout"
        (searchEvent)="search()"
        [rowsPerPageOptions]="rowsPerPageOptions"
        (rowSelected)="onRowSelected($event)"
        (onPageChange)="onPageChanged($event)"
        (rowUnSelected)="onRowUnSelected($event)"
      ></app-table>
      <app-edit-table
        [title]="tableTwoTitle"
        [cols]="subCols"
        [items]="rulesObjectItems"
        [loading]="loading"
        [data]="displaySelectionData"
        [selectionMode]="selectionMode"
        [actionButton]="true"
        [suggestions]="suggestions"
        [startingDisplayAmout]="startingDisplayAmout"
        [rowsPerPageOptions]="rowsPerPageOptions"
        [paginator]="false"
        [disableSortable]="true"
        (searchEvent)="onSearchSuggestion($event)"
      >
      </app-edit-table>
    </div>
  `,
  // encapsulation: ViewEncapsulation.None,
})
export class RulesComponent implements AfterViewInit, OnInit {
  private encodeParams(params) {
    return encodeURIComponent(params);
  }

  private openDetail(data) {
    this.dialog.open(OnlineRuleDetailComponent, {
      width: "60%",
      height: "750px",
      data: { ruleId: data.id },
    });
    this.cdr.detectChanges();
  }
  currentValue: any;
  tableOneTitle = "Rules";
  tableTwoTitle = "Rules Object";
  selectionMode = "multiple";
  rowsPerPageOptions = [10, 20, 30, 50, 100, 150, 200];
  data = [];
  selectedRule: any;
  ruleId: number;
  selectedAll: boolean;
  selectedOptions: any;
  startingDisplayAmout = 10;
  lazyEvent: string;
  exportRulesData: any;
  loading: boolean;
  totalRecords: number;
  sortOrder = 1;
  sortField: string;
  filter: any;
  first = 0;
  rows = 10;
  selectedValue = "111";
  suggestions = [];
  ruleObjectId: number;
  displaySearch = true;

  private subject = new Subject<boolean>();

  mainCols = [
    {
      field: "ruleName",
      type: "text",
      header: "Rule",
      width: 200,
      color: "#008cf0",
      iconClass: "pi-angle-right",
      onClick: (data) => this.openDetail(data),
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
    { field: "system-type", type: "text", header: "System Type" },
  ];
  subCols = [
    { field: "name", type: "text", header: "Auth Object" },
    { field: "fieldName", type: "text", header: "Auth Field" },
    { field: "fieldValue", type: "text", header: "Value" },
    { field: "joinByAnd", type: "text", header: "Join By AND" },
  ];

  rulesItems: MenuItem[] = [
    {
      label: "Filter",
      icon: "pi pi-filter",
    },
    {
      label: "Export",
      icon: "pi pi-file-excel",
      command: () => this.export(),
    },
    {
      label: "Rule Transport",
      icon: "pi pi-download",
      command: () => this.ruleTransport(),
    },
    {
      label: "Add",
      icon: "pi pi-plus-circle",
      command: () => this.addRule(),
    },
    {
      label: "Edit",
      icon: "pi pi-file-edit",
      command: () => this.editRule(),
    },
    {
      label: "Copy",
      icon: "pi pi-copy",
      command: () => this.copy(),
    },
    {
      label: "Delete",
      icon: "pi pi-trash",
      command: () => this.deleteRule(),
    },
  ];

  rulesObjectItems: MenuItem[] = [
    {
      label: "Save",
    },
    {
      label: "Cancel",
    },
  ];

  displaySelectionData = [];
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
    private cdr: ChangeDetectorRef
  ) {
    const lazyEvent = `{"first":0,"rows":10,"sortField":"ruleName","sortOrder":-1,"filters":{"ruleName":[{"value":null,"matchMode":"contains","operator":"and"}],"description":[{"value":null,"matchMode":"contains","operator":"and"}],"hostName":[{"value":null,"matchMode":"contains","operator":"and"}],"userName":[{"value":null,"matchMode":"contains","operator":"and"}],"clientNumber":[{"value":null,"matchMode":"contains","operator":"and"}],"sysNr":[{"value":null,"matchMode":"contains","operator":"and"}],"languageCode":[{"value":null,"matchMode":"contains","operator":"and"}],"sid":[{"value":null,"matchMode":"contains","operator":"and"}]},"globalFilter":null}`;
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

  ngOnInit() {
    this.getRulesData();
  }
  search() {
    this.dialog.open(RuleSearchComponent, {
      width: "55%",
    });
  }
  onSelectedAllChange(event) {
    console.log("event", event);
  }

  getRulesData() {
    this.loading = true;
    this.sortField = "ruleName";
    setTimeout(() => {
      this.ruleBookService
        .getRules(
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

  onPageChanged(event) {
    this.first = event.first;
    this.startingDisplayAmout = event.rows;
    console.log("starting", event.rows);
    this.getRulesData();
  }

  onRowSelected(selectedRow: any) {
    console.log("ruleId", selectedRow.id);
    this.selectedRule = selectedRow;
    this.ruleId = selectedRow.id;
    this.ruleBookService.getRuleObjects(this.ruleId).subscribe((res) => {
      this.displaySelectionData = res.data.rows;
    });
  }

  onRowUnSelected(unSelectedRow: any) {
    this.displaySelectionData = [];
  }

  export() {
    this.ruleBookService.getExportRules().subscribe((res) => {
      const blob = new Blob([res], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const filename = "RuleDetails.xlsx";
      this.saveExcelFile(blob, filename);
      this.notificationService.success("Success download RuleDetails");
    });
  }

  ruleTransport() {
    this.ruleBookService.getRuleTransport().subscribe(
      (res: Blob) => {
        saveAs(res, "DatAero_RuleBook");
        this.notificationService.success("Success download DataAero_RuleBook");
      },
      (error) => {
        this.notificationService.error(
          "Error downloading the DataAero_RuleBook"
        );
      }
    );
  }
  saveExcelFile(blob: Blob, filename: string): void {
    saveAs(blob, filename);
  }

  addRule() {
    this.selectedRule = null;
    this.ruleBookService.getAddRequired().subscribe((res) => {
      this.selectedOptions = res.data;
      this.addOrUpdateRule(this.selectedOptions);
    });
  }

  editRule() {
    this.checkRuleSelected();
    this.ruleBookService
      .getEditRequired(this.selectedRule.id)
      .subscribe((res) => {
        this.selectedOptions = res.data;
        this.addOrUpdateRule(this.selectedOptions);
      });
  }

  copy() {
    const clone = true;
    this.ruleBookService.ruleCopy(this.ruleId, clone).subscribe(
      (res) => {
        if (res.success) {
          this.notificationService.success("Successfully Copied!");
        }
      },
      catchError((err) => {
        this.notificationService.show(err.data.message);
        return throwError(() => err);
      })
    );
  }

  deleteRule() {
    this.checkRuleSelected();
    this.confirmationService.confirm({
      message: "Do you want to remove selected rule?",
      accept: () => {
        this.ruleBookService
          .ruleDelete(this.ruleId)
          .pipe(
            tap((res) => {
              this.notificationService.show(res);
              this.getRulesData();
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

  private checkRuleSelected() {
    if (!this.selectedRule) {
      this.notificationService.error("Please select a rule for editing");
      throw Error("Please select a rule for editing");
    }
  }

  ngAfterViewInit() {}

  private addOrUpdateRule(selectedOptions) {
    const dialogRef = this.dialog.open(AddRuleComponent, {
      width: "60%",
      data: { rule: this.selectedRule, selectedOptions: selectedOptions },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.getRulesData();
        // this.selectedRule = null;
        // this.displaySelectionData = [];
      }
    });
    // this.cdr.detectChanges();
  }

  openDialog() {}

  onSearchSuggestion(params: any) {
    console.log(params);
    const { query, field } = params;
    if (field === "name") {
      if (query) {
        this.ruleBookService
          .autoCompleteObjectRuleParam(query)
          .pipe(
            tap((res) => {
              console.log("res", res);
              this.suggestions = res.data;
            }),
            catchError((err) => {
              return throwError(() => err);
            }),
            takeUntil(this.subject)
          )
          .subscribe();
      }
    }
  }
}
