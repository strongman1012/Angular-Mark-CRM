import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'custom-p-table',
  templateUrl: './custom-prime-table.component.html',
  styleUrls: ['./custom-prime-table.component.scss'],
})
export class CustomPrimeTableComponent implements OnInit {
  @Input() items: any = [];
  @Input() selectedItems: any = [];
  @Input() columns: any = [];
  @Input() primaryKey: string;
  @Input() totalRecords: number;
  @Input() sortable: boolean;

  @Input() isLoading: boolean;

  @Input() callBack: (args: any) => void;
  @Input() onAllSelected: (args: any) => void;
  @Input() onRowSelect: (args: any) => void;
  @Input() onTableHeaderCheckboxToggle: (args: any) => void;
  @Input() onRowUnselect: (args: any) => void;
  @Input() header: any;
  @Input() filterEnabled: string = 'true';
  @Input() selectionMode: string = 'single';

  constructor() {
  }

  ngOnInit(): void {

  }

}
