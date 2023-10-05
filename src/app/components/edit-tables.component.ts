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
import { Observable } from "rxjs";
import { Subject, takeUntil, tap } from "rxjs";
import { MenuItem } from "primeng/api";
import { CommonModule } from "@angular/common";
import { FormControl, FormsModule } from "@angular/forms";
import {
  MatAutocomplete,
  MatAutocompleteModule,
} from "@angular/material/autocomplete";
import { AutoCompleteModule } from "primeng/autocomplete";
import { TableModule as PrimeTableModule } from "primeng/table";
import { MenuModule } from "primeng/menu";
import { ButtonModule } from "primeng/button";
import { OperationButtonComponent } from "./operations-buttons.component";
import { startWith, map } from "rxjs/operators";
import { InputTextModule } from "primeng/inputtext";
import { EventType } from "@angular/router";

@Component({
  standalone: true,
  selector: "app-edit-table",
  template: `
    <div class="flex-auto mx-10 mt-10">
      <p-table
        [value]="data"
        [title]="title"
        [loading]="loading"
        dataKey="id"
        [selectionMode]="selectionMode"
        [paginator]="true"
        [rows]="startingDisplayAmout"
        [rowsPerPageOptions]="rowsPerPageOptions"
        styleClass="p-datatable-sm"
        [globalFilterFields]="filterColumns"
        [paginator]="paginator"
      >
        <ng-template *ngIf="title" pTemplate="caption">
          <div class="flex flex-row">
            <p class="flex ml-2 my-auto text-center">{{ title }}</p>
            <div class="card flex justify-center ml-auto" *ngIf="actionButton">
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
        <ng-template *ngIf="displaySearch" pTemplate="caption">
          <div class="flex" style="justify-content: space-between">
            <span class="p-input-icon-left">
              <i class="pi pi-search"></i>
              <input
                pInputText
                type="text"
                (input)="dt2.filterGlobal($event.target.value, 'contains')"
                placeholder="Search users..."
                class="p-inputtext p-component p-element"
              />
            </span>
          </div>
        </ng-template>
        <ng-template pTemplate="header">
          <tr>
            <th
              *ngFor="let col of cols"
              [pSortableColumn]="col.field"
              class="w-[25%]"
            >
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
        <ng-template pTemplate="body" let-user>
          <tr [pEditableRow]="user">
            <ng-template ngFor let-item [ngForOf]="cols">
              <td
                [pEditableColumn]="user[item.field]"
                pEditableColumnField="{{ item.field }}"
              >
                <p-cellEditor>
                  <ng-template pTemplate="input">
                    <p-autoComplete
                      [(ngModel)]="selectedItem"
                      [suggestions]="suggestions"
                      [dropdown]="true"
                      (completeMethod)="search($event, item.field)"
                      (onFocus)="getCurrentValue(user, item.field)"
                    >
                    </p-autoComplete>
                  </ng-template>
                  <ng-template pTemplate="output">
                    {{ user[item.field] }}
                  </ng-template>
                </p-cellEditor>
              </td>
            </ng-template>
            <td *ngIf="operations.length > 0">
              <app-operation-button
                [operations]="operations"
              ></app-operation-button>
            </td>
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
    ButtonModule,
    OperationButtonComponent,
    AutoCompleteModule,
    MatAutocompleteModule,
    InputTextModule,
    FormsModule,
  ],
})
export class EditableTableComponent {
  @Input() selectedInput: string;
  @Input() selectionMode: string = "single";
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
  @Input() currentValue: any;
  @Input() items = [];
  @Input() startingDisplayAmout: number = 5;
  private subject = new Subject<boolean>();
  filterColumns = this.cols
    .filter((p) => p.field !== "enabled")
    .map<string>((q) => q.field);
  @Input() selectedUser: any;
  @Input() updateLogDescription: (string) => void;
  @Input() showDialog: (event) => void;
  @Input() rowsPerPageOptions = [5, 10, 25, 50];
  @Input() paginator = true;
  @Input() operations = [];
  @Input() suggestions: any;
  @Output() searchEvent = new EventEmitter<any>();
  @Output() rowSelect = new EventEmitter<any>();
  selectedItem: string;

  selectedValue = "Hello World";
  @Output() sharedVarChange = new EventEmitter();

  change(newvalue) {
    this.selectedInput = newvalue;
    this.sharedVarChange.emit(newvalue);
  }

  onSelect(event) {}
  search(event, field) {
    console.log(event.query);
    console.log(field);
    let params = { query: event.query, field: field };
    this.searchEvent.emit(params);
    // console.log("suggestion", this.suggestions);
  }

  getCurrentValue(user: any, field: string) {
    console.log("user", user);
    const currentValue = user[field];
    if (currentValue !== undefined) {
      this.selectedItem = user[field];
    }
  }

  ngOnInit() {}
}

export interface ColumnItems {
  field: string;
  type: string;
  header: string;
}
