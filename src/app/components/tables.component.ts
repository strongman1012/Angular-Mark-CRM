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
import { Subject, takeUntil, tap } from "rxjs";
import { MenuItem } from "primeng/api";
import { MatDialog } from "@angular/material/dialog";
import { CommonModule } from "@angular/common";
import { TableModule as PrimeTableModule } from "primeng/table";
import { MenuModule } from "primeng/menu";
import { ButtonModule } from "primeng/button";
import { OperationButtonComponent } from "./operations-buttons.component";
import { FormsModule } from "@angular/forms";

@Component({
  standalone: true,
  selector: "app-table",
  template: `
    <div class="flex-auto mx-3 mt-10">
      <p-table
        [value]="data"
        [title]="title"
        [loading]="loading"
        [lazy]="true"
        [totalRecords]="totalRecords"
        (onLazyLoad)="onPage($event)"
        dataKey="id"
        [scrollable]="true"
        scrollHeight="scrollHeight"
        [rows]="startingDisplayAmout"
        [rowsPerPageOptions]="rowsPerPageOptions"
        styleClass="p-datatable-sm"
        [selectionMode]="selectionMode"
        [(selection)]="selectedItems"
        (selectedChange)="onSelectedChange($event)"
        (onRowSelect)="onRowSelected($event)"
        (onRowUnselect)="onRowUnSelected($event)"
        [globalFilterFields]="filterColumns"
        [paginator]="paginator"
      >
        <ng-template *ngIf="title" pTemplate="caption">
          <div class="flex justify-between">
            <p class="text-center mx-3 my-auto">{{ title }}</p>
            <div class="flex mx-auto" *ngIf="displaySearch">
              <!-- <span class="p-input-icon-left">
                <i class="pi pi-search"></i>
                <input
                  pInputText
                  type="text"
                  (input)="dt2.filterGlobal($event.target.value, 'contains')"
                  placeholder="Search users..."
                  class="p-inputtext p-component p-element"
                />
              </span> -->
              <button
                pButton
                type="button"
                class="bg-white text-black"
                (click)="search()"
                icon="pi pi-search"
              ></button>
              <button
                pButton
                type="button"
                class="bg-white text-black mx-1"
                (click)="refresh()"
                icon="pi pi-refresh"
              ></button>
              <button
                pButton
                type="button"
                class="bg-white text-black"
                (click)="setting()"
                icon="pi pi-cog"
              ></button>
            </div>
            <div class="card flex justify-center" *ngIf="actionButton">
              <p-menu
                #menu
                class="shadow-xl"
                [model]="items"
                [appendTo]="'body'"
                [popup]="true"
              ></p-menu>
              <button
                pButton
                type="button"
                (click)="menu.toggle($event)"
                label="Actions"
                icon="pi pi-angle-down"
                iconPos="right"
                class="p-button-rounded bg-white text-black mr-3 py-1 px-3 hover:bg-blue-400 "
              ></button>
            </div>
          </div>
        </ng-template>

        <ng-template pTemplate="header">
          <tr>
            <th style="width: 4rem" *ngIf="selectCheckBox">
              <p-tableHeaderCheckbox
                [(value)]="selectedAll"
                [disabled]="loading"
                label="Select All"
                (click)="toggleSelectedAll()"
              ></p-tableHeaderCheckbox>
            </th>
            <th *ngFor="let col of cols" [pSortableColumn]="col.field">
              {{ col.header }}
              <ng-container *ngIf="!disableSortable">
                <p-sortIcon
                  field="{{ col.field }}"
                  (click)="menu.toggle($event)"
                ></p-sortIcon>
                <p-columnFilter
                  type="{{ col.type }}"
                  field="{{ col.field }}"
                  display="menu"
                ></p-columnFilter>
              </ng-container>
            </th>
            <th *ngIf="operations.length > 0">Operations</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-user let-rowIndex="rowIndex">
          <tr [pSelectableRow]="user">
            <td *ngIf="selectCheckBox">
              <p-tableCheckbox [value]="user"></p-tableCheckbox>
            </td>
            <ng-template ngFor let-item [ngForOf]="cols">
              <td
                *ngIf="item.type === 'boolean'"
                [ngStyle]="{
                  width: item && item.width ? item.width + 'px' : 'auto'
                }"
              >
                <i
                  *ngIf="item.iconClass"
                  class="{{
                    user[item.field]
                      ? item.iconClass['tr']
                      : item.iconClass['fs']
                  }}"
                >
                </i>
                <i
                  *ngIf="!item.iconClass"
                  class="pi"
                  [ngClass]="{
                    'true-icon pi-check-circle': user[item.field],
                    'false-icon pi-times-circle': !user[item.field]
                  }"
                >
                </i>
              </td>
              <td
                class="truncate"
                *ngIf="item.type === 'time'"
                [ngStyle]="{
                  width: item && item.width ? item.width + 'px' : 'auto',
                  color: item && item.color ? item.color : 'inherent'
                }"
              >
                {{ convertDate(user[item.field]) }}
              </td>

              <td
                class="truncate"
                *ngIf="item.type === 'text' && item.subField"
                [ngStyle]="{
                  width: item && item.width ? item.width + 'px' : 'auto',
                  color: item && item.color ? item.color : 'inherent'
                }"
              >
                <i *ngIf="item.iconClass" class="pi {{ item.iconClass }}"></i>
                {{ user[item.field][item.subField] }}
              </td>
              <td
                class="truncate"
                *ngIf="item.type === 'text' && !item.subField && !item.onClick"
                [ngStyle]="{
                  width: item && item.width ? item.width + 'px' : 'auto',
                  color: item && item.color ? item.color : 'inherent'
                }"
              >
                <i *ngIf="item.iconClass" class="pi {{ item.iconClass }}"></i>
                {{ user[item.field] }}
              </td>
              <td
                class="truncate"
                *ngIf="item.type === 'text' && item.onClick"
                [ngStyle]="{
                  width: item && item.width ? item.width + 'px' : 'auto',
                  color: item && item.color ? item.color : 'inherent'
                }"
                (click)="item.onClick(user)"
              >
                <i *ngIf="item.iconClass" class="pi {{ item.iconClass }}"></i>
                {{ user[item.field] }}
              </td>
            </ng-template>

            <td *ngIf="operations.length > 0">
              <app-operation-buttons
                [operations]="operations"
              ></app-operation-buttons>
            </td>
          </tr>
        </ng-template>
        <ng-template pTemplate="emptymessage">
          <tr>
            <td colspan="20" class="text-center text-[20px]">No data</td>
          </tr>
        </ng-template>
      </p-table>
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
  imports: [
    PrimeTableModule,
    CommonModule,
    MenuModule,
    FormsModule,
    ButtonModule,
    OperationButtonComponent,
  ],
})
export class TableComponent {
  @Input() title: string;
  @Input() disableSortable: boolean = false;
  @Input() actionButton: boolean = false;
  @Input() logDescription: string;
  @Output() logDescriptionChange = new EventEmitter<string>();
  @Input() data: any[];
  menuItems: MenuItem[] = [];
  @Input() totalRecords: number;
  @Input() cols: ColumnItems[] = [];
  @Input() loading: boolean;
  @Input() displaySearch: boolean;
  @Input() selectionMode: string = "single";
  @Input() startingDisplayAmout: number;
  private subject = new Subject<boolean>();
  filterColumns = this.cols
    .filter((p) => p.field !== "enabled")
    .map<string>((q) => q.field);
  @Input() selectedItems: any[];
  @Input() updateLogDescription: (string) => void;
  @Input() showDialog: (event) => void;
  @Input() rowsPerPageOptions = [5, 10, 25, 50];
  @Input() paginator = true;
  @Input() operations = [];
  @Input() items = [];
  @Input() selectCheckBox: boolean = false;
  @Input() scrollHeight: string = "400px";
  @Output() onPageChange = new EventEmitter<any>();
  @Output() rowSelected = new EventEmitter<any>();
  @Output() rowUnSelected = new EventEmitter<any>();
  @Output() selectedChange = new EventEmitter<any[]>();
  @Output() searchEvent = new EventEmitter<any>();
  @Input() selectedAll: boolean = false;
  @Output() selectedAllChange = new EventEmitter<boolean>();

  public onSelectedChange(event) {
    this.selectedChange.emit(this.selectedItems);
  }

  toggleSelectedAll() {
    this.selectedAll = !this.selectedAll;
    this.selectedAllChange.emit(this.selectedAll);
  }

  public search() {
    this.searchEvent.emit();
  }

  public onRowSelected(event) {
    this.logDescriptionChange.emit(event.data.logDescription);
    this.rowSelected.emit(event.data);
  }
  public onRowUnSelected(event) {
    this.logDescriptionChange.emit(event.data.logDescription);
    this.rowUnSelected.emit(event.data);
  }

  public onPage(event: any) {
    this.onPageChange.emit(event);
  }

  public convertDate(timestamp: any): string {
    const date = new Date(JSON.parse(timestamp));
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const hour = ("0" + date.getHours()).slice(-2);
    const minute = ("0" + date.getMinutes()).slice(-2);
    const second = ("0" + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }
  ngOnChanges(changes: SimpleChanges) {}
}

export interface ColumnItems {
  field: string;
  type: string;
  header: string;
}
