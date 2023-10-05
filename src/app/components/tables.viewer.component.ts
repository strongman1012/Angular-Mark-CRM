import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewEncapsulation,
} from "@angular/core";
import { map, Subject, takeUntil, tap } from "rxjs";
import { LazyLoadEvent, MenuItem } from "primeng/api";
import { MatDialog } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";
import { TableModule as PrimeTableModule } from "primeng/table";
import { MenuModule } from "primeng/menu";
import { ButtonModule } from "primeng/button";
import { ReportingService } from "app/modules/admin_2/reporting-units/reporting/reporting.service";
import { ReportingDetailComponent } from "app/modules/admin_2/reporting-units/reporting/reporting-detail/reporting-detail.component";

@Component({
  standalone: true,
  selector: "app-table-viewer",
  template: `
    <div
      class="sm:col-span-2 md:col-span-4 flex flex-col flex-auto p-6 bg-card shadow rounded-2xl overflow-hidden"
    >
      <div class="grid grid-cols-1  grid-flow-row gap-6 w-full mt-8 sm:mt-4">
        <div class="text-xl font-medium tracking-tight leading-6 truncate">
          Reporting Units
        </div>
        <div class="flex flex-col flex-auto">
          <p-table
            #dt2
            [value]="reportingUnits"
            [lazy]="true"
            (onLazyLoad)="loadData($event)"
            dataKey="name"
            [paginator]="true"
            [scrollable]="true"
            [style]="{ width: '100%' }"
            scrollDirection="horizontal"
            selectionMode="single"
            [(selection)]="selectedRow"
            [globalFilterFields]="filterColumns"
            [rows]="10"
            [totalRecords]="totalRecords"
            [loading]="loading"
          >
            <ng-template pTemplate="caption">
              <div class="flex" style="justify-content: space-between">
                <p-multiSelect
                  [options]="cols"
                  [(ngModel)]="selectedColumns"
                  optionLabel="header"
                  selectedItemsLabel="{0} columns selected"
                  [style]="{ minWidth: '200px' }"
                  placeholder="Choose Columns"
                >
                </p-multiSelect>
                <button
                  type="button"
                  class="ml-auto  p-button-rounded p-button-sm"
                  pButton
                  icon="pi pi-angle-double-down"
                  label="Actions"
                  (click)="menu.toggle($event)"
                ></button>
                <p-menu
                  appendTo="body"
                  #menu
                  [popup]="true"
                  [model]="menuItems"
                ></p-menu>
              </div>
            </ng-template>
            <ng-template pTemplate="header">
              <tr>
                <th
                  *ngFor="let col of selectedColumns"
                  pSortableColumn="{{ col.field }}"
                  [ngStyle]="{
                    width: col && col.width ? col.width + 'px' : 'auto'
                  }"
                >
                  {{ col.header }}
                  <p-sortIcon field="{{ col.field }}"></p-sortIcon>
                </th>
              </tr>
            </ng-template>
            <ng-template pTemplate="body" let-item>
              <tr [pSelectableRow]="item">
                <ng-container *ngFor="let col of selectedColumns">
                  <td
                    *ngIf="col.type === 'boolean'"
                    [ngStyle]="{
                      width: col && col.width ? col.width + 'px' : 'auto'
                    }"
                    (click)="col.onClick(item)"
                  >
                    <i
                      class="pi"
                      [ngClass]="{
                        'true-icon pi-check-circle': item[col.field],
                        'false-icon pi-times-circle': !item[col.field]
                      }"
                    >
                    </i>
                  </td>
                  <td
                    class="truncate"
                    *ngIf="col.type === 'text' && col.subField"
                    (click)="col.onClick(item)"
                    [ngStyle]="{
                      width: col && col.width ? col.width + 'px' : 'auto',
                      color: col && col.color ? col.color : 'inherent'
                    }"
                  >
                    <i *ngIf="col.iconClass" class="pi {{ col.iconClass }}"></i>
                    {{ item[col.field][col.subField] }}
                  </td>
                  <td
                    class="truncate"
                    *ngIf="col.type === 'text' && !col.subField"
                    [ngStyle]="{
                      width: col && col.width ? col.width + 'px' : 'auto',
                      color: col && col.color ? col.color : 'inherent'
                    }"
                    (click)="col.onClick(item)"
                  >
                    <i *ngIf="col.iconClass" class="pi {{ col.iconClass }}"></i>
                    {{ item[col.field] }}
                  </td>
                </ng-container>
              </tr>
            </ng-template>
          </p-table>
        </div>
      </div>

      <div class="grid grid-cols-1  grid-flow-row gap-6 w-full mt-8 sm:mt-4">
        <div class="text-xl font-medium tracking-tight leading-6 truncate">
          Rules Objects
        </div>
        <div class="flex flex-col flex-auto">
          <p-table
            #dt2
            [value]="reportingUnits"
            [lazy]="true"
            (onLazyLoad)="loadData($event)"
            dataKey="name"
            [paginator]="true"
            [scrollable]="true"
            [style]="{ width: '100%' }"
            scrollDirection="horizontal"
            selectionMode="single"
            [(selection)]="selectedRow"
            [globalFilterFields]="filterColumns"
            [rows]="10"
            [totalRecords]="totalRecords"
            [loading]="loading"
          >
            <ng-template pTemplate="caption">
              <div class="flex" style="justify-content: space-between">
                <p-multiSelect
                  [options]="cols"
                  [(ngModel)]="selectedColumns"
                  optionLabel="header"
                  selectedItemsLabel="{0} columns selected"
                  [style]="{ minWidth: '200px' }"
                  placeholder="Choose Columns"
                >
                </p-multiSelect>
                <button
                  type="button"
                  class="ml-auto  p-button-rounded p-button-sm"
                  pButton
                  icon="pi pi-angle-double-down"
                  label="Actions"
                  (click)="menu.toggle($event)"
                ></button>
                <p-menu
                  appendTo="body"
                  #menu
                  [popup]="true"
                  [model]="menuItems"
                ></p-menu>
              </div>
            </ng-template>
            <ng-template pTemplate="header">
              <tr>
                <th
                  *ngFor="let col of selectedColumns2"
                  pSortableColumn="{{ col.field }}"
                  [ngStyle]="{
                    width: col && col.width ? col.width + 'px' : 'auto'
                  }"
                >
                  {{ col.header }}
                  <p-sortIcon field="{{ col.field }}"></p-sortIcon>
                </th>
              </tr>
            </ng-template>
            <ng-template pTemplate="body" let-item>
              <tr [pSelectableRow]="item">
                <ng-container *ngFor="let col of selectedColumns">
                  <td
                    *ngIf="col.type === 'boolean'"
                    [ngStyle]="{
                      width: col && col.width ? col.width + 'px' : 'auto'
                    }"
                    (click)="col.onClick(item)"
                  >
                    <i
                      class="pi"
                      [ngClass]="{
                        'true-icon pi-check-circle': item[col.field],
                        'false-icon pi-times-circle': !item[col.field]
                      }"
                    >
                    </i>
                  </td>
                  <td
                    class="truncate"
                    *ngIf="col.type === 'text' && col.subField"
                    (click)="col.onClick(item)"
                    [ngStyle]="{
                      width: col && col.width ? col.width + 'px' : 'auto',
                      color: col && col.color ? col.color : 'inherent'
                    }"
                  >
                    <i *ngIf="col.iconClass" class="pi {{ col.iconClass }}"></i>
                    {{ item[col.field][col.subField] }}
                  </td>
                  <td
                    class="truncate"
                    *ngIf="col.type === 'text' && !col.subField"
                    [ngStyle]="{
                      width: col && col.width ? col.width + 'px' : 'auto',
                      color: col && col.color ? col.color : 'inherent'
                    }"
                    (click)="col.onClick(item)"
                  >
                    <i *ngIf="col.iconClass" class="pi {{ col.iconClass }}"></i>
                    {{ item[col.field] }}
                  </td>
                </ng-container>
              </tr>
            </ng-template>
          </p-table>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
  // encapsulation: ViewEncapsulation.None,
  imports: [PrimeTableModule, CommonModule, MenuModule, ButtonModule],
})
export class TableViewerComponent {
  selectedRow: any;
  reportingUnits = [];
  loading: boolean;
  totalRecords: number;
  private lastTableLazyLoadEvent: LazyLoadEvent;
  private subject = new Subject<boolean>();
  private openDetail(data) {
    console.log("Data", data);
    this.matDialog.open(ReportingDetailComponent, {
      width: "60%",
      data: { reportingUnit: data },
    });
  }
  cols = [
    {
      field: "name",
      type: "text",
      header: "Name",
      width: 200,
      color: "#008cf0",
      iconClass: "pi-angle-right",
      onClick: (data) => this.openDetail(data),
    },
    { field: "sapSystemsStr", type: "text", header: "Systems" },
    {
      field: "dbConnection",
      type: "text",
      subField: "name",
      header: "Database",
    },
    {
      field: "dbConnection",
      type: "text",
      subField: "url",
      header: "Database URL",
    },
    // {field: 'notificationScope', type: 'boolean', header: 'Notification Scope'},
  ];
  cols2 = [
    {
      field: "auth-obj",
      type: "text",
      header: "Auth Object",
      width: 200,
      color: "#008cf0",
      iconClass: "pi-angle-right",
      onClick: (data) => this.openDetail(data),
    },
    { field: "sapSystemsStr", type: "text", header: "Auth Field" },
    { field: "dbConnection", type: "text", subField: "name", header: "Value" },
    {
      field: "dbConnection",
      type: "text",
      subField: "url",
      header: "Join By AND",
    },
  ];
  selectedColumns = this.cols;
  selectedColumns2 = this.cols2;
  filterColumns = this.cols
    .filter((p) => p.type !== "boolean")
    .map<string>((q) => q.field);

  public loadData($event) {
    this.lastTableLazyLoadEvent = $event;
    setTimeout(() => {
      this.apiService
        .list({ lazyEvent: JSON.stringify($event) })
        .pipe(
          map((apiResponse) => {
            this.reportingUnits = apiResponse.data.rows;
            this.totalRecords = apiResponse.data.records;
            this.loading = false;
          }),
          takeUntil(this.subject)
        )
        .subscribe();
    }, 10);
  }
  constructor(
    private apiService: ReportingService,
    private matDialog: MatDialog
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }
}

export interface ColumnItems {
  field: string;
  type: string;
  header: string;
}
