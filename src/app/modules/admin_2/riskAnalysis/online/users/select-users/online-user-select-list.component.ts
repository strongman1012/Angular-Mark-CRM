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
  OnlineUserDetailComponent,
} from '../user-detail/online-user-detail.component';

@Component({
  selector: 'online-user-select-list',
  template: ``,
  // templateUrl: './online-user-select-list.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class OnlineUserSelectListComponent implements OnInit, OnDestroy {

  cols = [
    {
      name: 'bname', type: 'text', header: 'User ID',
      width: 200,
      color: '#008cf0',
      iconClass: 'pi-angle-right',
      onClick: data => this.openDetail(data),
    },
    {name: 'userName', type: 'text', header: 'Name'},
    {name: 'ustyp', type: 'text', header: 'Type'},
    {name: 'clas', type: 'text', header: 'Group'},
    {name: 'uflag', type: 'text', header: 'Lock'},
    {
      name: 'gltgbInDateFmt',
      type: 'text',
      header: 'Valid To',
      filterEnabled: 'false',
    },
  ];
  isAllChecked: boolean;
  items: [];
  private selectedItems: any = [];
  totalRecords: any;
  private subject = new Subject<boolean>();
  private tableEvent: any;
  private preSelection: any;
  private selectedSessionTables: any;

  /**
   * Constructor
   */
  constructor(
      @Inject(MAT_DIALOG_DATA) public dialogData: any,
      private dialogRef: MatDialogRef<OnlineUserSelectListComponent>,
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
    if (this.preSelection.selectedSessionTables !== null &&
        this.preSelection.selectedSessionTables !== undefined) {
      this.selectedSessionTables = this.preSelection.selectedSessionTables;
    }

  }

  callBackFn = (event): void => {
    this.loadData(event);
  };

  onTableHeaderCheckboxToggle(event: any) {
    if (event.checked === true) {
      this.selectedItems = this.items;
    } else {
      this.selectedItems.length = 0;
    }

  }

  onRowSelect = (event): void => {
    this.selectedItems.push(event.data.bname);
  };
  onRowUnselect = (event): void => {
    this.selectedItems = this.selectedItems.filter(
        obj => obj !== event.data.bname);
  };

  loadData(event) {
    this.tableEvent = event;
    const data = {
      lazyEvent: this.tableEvent,
      selectedSAP: this.preSelection.selectedSAP,
      options: this.preSelection.options,
      selectedusers: this.selectedItems,
      userSessionTables: this.selectedSessionTables,
    };

    this.apiService.findUsers(data).pipe(
        map((apiResponse) => {
          this.items = apiResponse.data.gridData.rows;
          this.selectedSessionTables = apiResponse.data.userSessionTables;
          this.totalRecords = apiResponse.data.gridData.records;
        }),
        takeUntil(this.subject),
    ).subscribe();
  }

  saveSelected() {
    this.loadData(this.tableEvent);
  }

  closeDialog() {
    this.dialogRef.close(
        {
          selectedUsersIds: this.selectedItems,
          selectedSessionTables: this.selectedSessionTables,
        });
  }

  saveAll() {
    const data = {
      lazyEvent: this.tableEvent,
      selectedSAP: this.preSelection.selectedSAP,
      options: this.preSelection.options,
    };
    this.apiService.findAllUsers(data).pipe(
        tap((apiResponse) => {
          this.dialogRef.close(
              {
                selectedUsersIds: apiResponse.data.selectedusers,
                selectedSessionTables: this.selectedSessionTables,
              });
        }),
        takeUntil(this.subject),
    ).subscribe();

  }

  ngOnDestroy(): void {
    this.subject.next(true);
    this.subject.complete();

  }

  private openDetail(data) {
    const userDetail = {
      userId: data.bname,
      sapId: this.preSelection.selectedSAP,
    };
    const dialogRef = this.dialog.open(OnlineUserDetailComponent, {
      autoFocus: false,
      maxHeight: '80vh',
      width: '70%',
      disableClose: false,
      data: userDetail,
    });

    dialogRef.afterClosed().subscribe((result) => {
    });
  }
}
