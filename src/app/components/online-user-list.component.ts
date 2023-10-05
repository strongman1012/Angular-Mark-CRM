import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoadSelectionService } from 'app/backend-api/load-selection.service';
import { RiskAnalysisOnlineService } from 'app/modules/acm/riskAnalysis/risk-analysis-online.service';
import { OnlineUserSelectListComponent } from 'app/modules/admin_2/riskAnalysis/online/users/select-users/online-user-select-list.component';
import { OnlineUserDetailComponent } from 'app/modules/admin_2/riskAnalysis/online/users/user-detail/online-user-detail.component';
import {map, Subject, takeUntil} from 'rxjs';
import { CustomListComponent } from './custom-list.component';

@Component({
  standalone: true,
  selector: 'online-users',
  template: `
  <custom-list
        [header]="header"
        [columns]="cols"
        [menuItems]="menuItems"
        [items]="items" primaryKey="bname"
        [callBack]="loadData"
        [sortable]="false"
        [totalRecords]="totalRecords"
        [onRowSelect]="onRowSelect" [onRowUnselect]="onRowUnselect">
  </custom-list>
  `,
  imports: [
    CustomListComponent
  ],
  // templateUrl: './online-user-list.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class OnlineUserListComponent implements OnInit, OnDestroy {
  @Input() header;
  @Input() preSelection;
  @Input() items;

  tableEvent: any;
  loadData = (event): void => {
    this.loadDataInner(event);
  };

  loadDataInner(event) {
    if (this.preSelection == null) {
      return;
    }
    this.tableEvent = event;
    const data = {
      lazyEvent: this.tableEvent,
      sapId: this.preSelection.selectedSAP,
      selectedIds: this.preSelection.selectedusers,

    };

    this.riskAnalysisOnlineService.userSelectedList(data).pipe(
        map((apiResponse) => {
          this.items = apiResponse.data.rows;
          this.totalRecords = apiResponse.data.records;
        }),
        takeUntil(this.subject),
    ).subscribe();
  }

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

  selectedItem: any;
  totalRecords: any;
  loading: any;
  private subject = new Subject<boolean>();
  menuItems = [
    {
      label: 'Remove',
      icon: 'pi pi-user-plus',
      command: () => this.remove(),
    },
    {
      label: 'Remove All',
      icon: 'pi pi-user-edit',
      command: () => this.removeAll(),
    },
    {
      label: 'Select',
      icon: 'pi pi-user-edit',
      command: () => this.openUserSelectDialog(),
    },
  ];
  onRowSelect = (event): void => {
    this.selectedItem = event.data;
  };
  onRowUnselect = (event): void => {
    this.selectedItem = null;
  };

  /**
   * Constructor
   */
  constructor(
      private _loadSelectionService: LoadSelectionService,
      public dialog: MatDialog,
      private riskAnalysisOnlineService: RiskAnalysisOnlineService,
  ) {

  }

  ngOnInit(): void {

  }

  remove() {
    this.preSelection.selectedusers = this.preSelection.selectedusers.filter(
        obj => obj !== this.selectedItem.bname);
    this.loadData(this.tableEvent);
  }

  removeAll() {
    this.preSelection.selectedusers = [];
    this.loadData(this.tableEvent);
  }

  openUserSelectDialog() {
    if (this.preSelection !== null && this.preSelection !== undefined) {
      const dialogRef = this.dialog.open(OnlineUserSelectListComponent, {
        autoFocus: false,
        maxHeight: '110vh',
        width: '70%',
        disableClose: true,
        data: {
          preSelection: this.preSelection,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.preSelection.selectedusers = result.selectedUsersIds;
        this.preSelection.selectedSessionTables = result.selectedSessionTables;

        this.loadDataInner(this.tableEvent);
      });
    }

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

  ngOnDestroy(): void {
    this.subject.next(true);
    this.subject.complete();

  }
}
