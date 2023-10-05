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
  selector: 'custom-list',
  templateUrl: './custom-list.component.html',
  styleUrls: ['./custom-list.component.scss'],
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
