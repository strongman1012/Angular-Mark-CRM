import {
  Component, EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { CustomPrimeTableComponent } from './custom-prime-table.component';

@Component({
  standalone: true,
  selector: 'custom-list',
  template: `
  <div class="flex flex-col p-6">
    <div class="flex min-w-0">
        <div class="flex-auto">
            <h1 class="text-3xl font-bold mt-0 mb-6">{{header}}</h1>
        </div>
    </div>
    <div class="flex">
        <div class="flex-auto"></div>
        <div>
            <button type="button"
                    class="ml-auto  p-button-rounded p-button-sm"
                    pButton icon="pi pi-angle-double-down" label="Actions"
                    (click)="menu.toggle($event)"></button>
            <p-menu appendTo="body" #menu [popup]="true" [model]="menuItems"></p-menu>
        </div>
    </div>
    <custom-p-table [columns]="columns" [items]="items" [primaryKey]="primaryKey"
                    [callBack]="callBack"
                    [sortable]="sortable"
                    [totalRecords]="totalRecords"
                    [onRowSelect]="onRowSelect" [onRowUnselect]="onRowUnselect">
    </custom-p-table>
  </div>
  `,
  imports: [
    ButtonModule,
    MenuModule,
    CustomPrimeTableComponent
  ]
  // styleUrls: ['./custom-list.component.scss'],
})
export class CustomListComponent implements OnInit {
  @Input() items: any = [];
  @Input() columns: any = [];
  @Input() primaryKey: string;
  @Input() totalRecords: number;

  @Input() isLoading: boolean;
  @Input() sortable: boolean;
  @Output() selectedItems = new EventEmitter<any>();
  @Input() callBack: (args: any) => void;
  @Input() onRowSelect: (args: any) => void;
  @Input() onRowUnselect: (args: any) => void;
  @Input() header: any;
  @Input() filterEnabled: string = 'true';
  @Input() selectionMode: string = 'single';
  @Input() menuItems: any;

  constructor() {
  }

  ngOnInit(): void {

  }

}
