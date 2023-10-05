import {
  AfterViewInit,
  Component,
  OnInit,
  ViewEncapsulation,
} from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { RuleBookService } from "app/backend-api/rule-book.service";
import { MenuItem } from "primeng/api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

@Component({
  selector: "rules-component",
  template: `
    <div class="w-full mb-5">
      <app-table
        [title]="tableOneTitle"
        [cols]="mainCols"
        [data]="data"
        [items]="ruleItems"
        [startingDisplayAmout]="startingDisplayAmout"
        [rowsPerPageOptions]="rowsPerPageOptions"
        [actionButton]="true"
        (rowSelected)="onRowSelected($event)"
        (rowUnSelected)="onRowUnSelected($event)"
      ></app-table>
      <app-table
        [title]="tableTwoTitle"
        [cols]="subCols"
        [data]="displaySelectionData"
        [startingDisplayAmout]="startingDisplayAmout"
        [rowsPerPageOptions]="rowsPerPageOptions"
        [paginator]="false"
        [disableSortable]="true"
      ></app-table>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class AuditLogsRulesComponent implements AfterViewInit, OnInit {
  private encodeParams(params) {
    return encodeURIComponent(params);
  }

  tableOneTitle = "Rule Change Log";
  tableTwoTitle = "Change Details";
  rowsPerPageOptions = [10, 20, 30, 50, 100, 150, 200];
  startingDisplayAmout = 10;
  mainCols = [
    { field: "ruleName", type: "text", header: "Rule" },
    { field: "action", type: "text", header: "Action" },
    { field: "updateTime", type: "time", header: "Time" },
    { field: "updatedBy", type: "text", header: "Updated By" },
  ];
  subCols = [
    { field: "action", type: "text", header: "Action" },
    { field: "objct", type: "text", header: "Object" },
    { field: "field", type: "text", header: "Field" },
    { field: "val", type: "text", header: "Value" },
    { field: "joinByAnd", type: "text", header: "Join by AND" },
  ];
  ruleItems: MenuItem[] = [
    {
      label: "Export Logs",
      command: () => this.downloadExcel(),
    },
  ];
  timezone: string;
  data = [];
  displaySelectionData = [];
  lazyEvent: string;
  title = "communication test";
  /**
   * Constructor
   */
  constructor(
    private _formBuilder: FormBuilder,
    private ruleBookService: RuleBookService,
    public dialog: MatDialog
  ) {
    this.timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const lazyEvent = {
      first: 0,
      rows: 10,
      sortField: "null",
      sortOrder: -1,
      filters: {
        riskName: [{ value: null, matchMode: "contains", operator: "and" }],
        description: [{ value: null, matchMode: "contains", operator: "and" }],
        hostName: [{ value: null, matchMode: "contains", operator: "and" }],
        userName: [{ value: null, matchMode: "contains", operator: "and" }],
        clientNumber: [{ value: null, matchMode: "contains", operator: "and" }],
        sysNr: [{ value: null, matchMode: "contains", operator: "and" }],
        languageCode: [{ value: null, matchMode: "contains", operator: "and" }],
        sid: [{ value: null, matchMode: "contains", operator: "and" }],
      },
      globalFilter: null,
    };
    this.lazyEvent = this.encodeParams(JSON.stringify(lazyEvent));
  }

  ngOnInit(): void {
    this.ruleBookService
      .getRuleAuditLogs(this.lazyEvent, this.timezone)
      .subscribe((res) => (this.data = res.rows));
  }

  onRowSelected(selectedRow: any) {
    const logId = selectedRow.id;
    this.ruleBookService
      .getRuleObjLogDetails(logId)
      .subscribe((res) => (this.displaySelectionData = res.data.rows));
  }
  onRowUnSelected(unSelectedRow: any) {
    this.displaySelectionData = [];
  }
  downloadExcel() {
    const filename = "RuleAuditLog";
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    this.saveExcelFile(excelBuffer, filename);
  }
  saveExcelFile(buffer: any, filename: string): void {
    const blob: Blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `${filename}.xlsx`);
  }
  ngAfterViewInit() {}

  openDialog() {}
}
