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
        [actionButton]="true"
        [items]="riskItems"
        [data]="data"
        [startingDisplayAmout]="startingDisplayAmout"
        [rowsPerPageOptions]="rowsPerPageOptions"
        (rowSelected)="onRowSelected($event)"
        (rowUnSelected)="onRowUnSelected($event)"
      ></app-table>
      <app-table
        class="py-5"
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
export class AuditLogsRisksComponent implements AfterViewInit, OnInit {
  private encodeParams(params) {
    return encodeURIComponent(params);
  }

  tableOneTitle = "Risk Change Log";
  tableTwoTitle = "Change Details";
  rowsPerPageOptions = [10, 20, 30, 50, 100, 150, 200];
  startingDisplayAmout = 10;
  mainCols = [
    { field: "riskId", type: "text", header: "Risk ID" },
    { field: "action", type: "text", header: "Action" },
    { field: "updateTime", type: "time", header: "Time" },
    { field: "updatedBy", type: "text", header: "Updated By" },
  ];
  subCols = [
    { field: "action", type: "text", header: "Action" },
    { field: "valueBefore", type: "text", header: "Before" },
    { field: "valueAfter", type: "text", header: "After" },
  ];

  riskItems: MenuItem[] = [
    {
      label: "Export Logs",
      command: () => this.downloadExcel(),
    },
  ];
  title = "communication test";
  /**
   * Constructor
   */
  timezone: string;
  data = [];
  displaySelectionData = [];
  lazyEvent: string;

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
      .getRiskAuditLogs(this.lazyEvent, this.timezone)
      .subscribe((res) => (this.data = res.data.rows));
  }
  downloadExcel() {
    const filename = "RiskAuditLog";
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
  onRowSelected(selectedRow: any) {
    const logId = selectedRow.id;
    this.ruleBookService
      .getRiskRuleLogDetails(logId)
      .subscribe((res) => (this.displaySelectionData = res.data.rows));
  }
  onRowUnSelected(unSelectedRow: any) {
    this.displaySelectionData = [];
  }
  ngAfterViewInit() {}

  openDialog() {}
}
