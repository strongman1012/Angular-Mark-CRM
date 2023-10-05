import {
  Component, Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit, Output,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import {map, Subject, takeUntil, tap} from 'rxjs';
import {
  LoadSelectionService,
} from '../../../../../../backend-api/load-selection.service';
import {RiskAnalysisOnlineService} from '../../risk-analysis-online.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  OnlineRoleDetailComponent,
} from '../role-detail/online-role-detail.component';

@Component({
  selector: 'online-role-select-list',
  template: ``,
  encapsulation: ViewEncapsulation.None,
})
export class OnlineRoleSelectListComponent implements OnInit, OnDestroy {

  cols = [
    {
      name: 'name', type: 'text', header: 'Role Name',
      width: 200,
      color: '#008cf0',
      iconClass: 'pi-angle-right',
      onClick: data => this.openDetail(data),
    },
    {name: 'description', type: 'text', header: 'Description'},

  ];
  items: [];
  selectedItems: any = [];
  totalRecords: any;
  private subject = new Subject<boolean>();
  private tableEvent: any;
  private preSelection: any;

  /**
   * Constructor
   */
  constructor(
      @Inject(MAT_DIALOG_DATA) public dialogData: any,
      private dialogRef: MatDialogRef<OnlineRoleSelectListComponent>,
      private _loadSelectionService: LoadSelectionService,
      private apiService: RiskAnalysisOnlineService,
      public dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.preSelection = this.dialogData.preSelection;
    this.selectedItems = this.preSelection.selectedusers;
    if (this.selectedItems === null || this.selectedItems === undefined) {
      this.selectedItems = [];
    }
  }

  loadData = (event): void => {
    this.tableEvent = event;
    const data = {
      lazyEvent: this.tableEvent,
      selectedSAP: this.preSelection.selectedSAP,
      options: this.preSelection.options,
      selectedusers: this.selectedItems
    };

    this.apiService.findRoles(data).pipe(
        map((apiResponse) => {
          this.items = apiResponse.data.gridData.rows;
          this.totalRecords = apiResponse.data.gridData.records;
        }),
        takeUntil(this.subject),
    ).subscribe();
  };

  onRowSelect = (event): void => {
    this.selectedItems.push(event.data.name);
  };
  onRowUnselect = (event): void => {
    this.selectedItems = this.selectedItems.filter(obj => obj !== event.data.name);
  };

  closeDialog() {
    this.dialogRef.close({selectedRolesIds: this.selectedItems});
  }

  saveSelected() {
    this.loadData(this.tableEvent);
  }
  saveAll() {
    const data = {
      lazyEvent: this.tableEvent,
      selectedSAP: this.preSelection.selectedSAP,
      options: this.preSelection.options,
      selectedusers: [],
    };
    this.apiService.findAllRoles(data).pipe(
        tap((apiResponse) => {
          this.dialogRef.close({selectedRolesIds: apiResponse.data.selectedusers});
        }),
        takeUntil(this.subject),
    ).subscribe();

  }

  ngOnDestroy(): void {
    this.subject.next(true);
    this.subject.complete();

  }

  private openDetail(data) {
    const roleDetail = {
      roleId: data.name,
      sapId: this.preSelection.selectedSAP,
    };
    this.dialog.open(OnlineRoleDetailComponent, {
      autoFocus: false,
      maxHeight: '80vh',
      width: '70%',
      disableClose: false,
      data: roleDetail,
    });

  }


}
