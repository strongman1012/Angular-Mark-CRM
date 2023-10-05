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
import { OnlineRoleDetailComponent } from 'app/modules/admin_2/riskAnalysis/online/roles/role-detail/online-role-detail.component';
import { OnlineRoleSelectListComponent } from 'app/modules/admin_2/riskAnalysis/online/roles/select-roles/online-role-select-list.component';
import {map, Subject, takeUntil} from 'rxjs';
import { CustomListComponent } from './custom-list.component';

@Component({
  standalone: true,
  selector: 'online-roles',
  template: `
  <custom-list
        header="Role List"
        [columns]="cols"
        [menuItems]="menuItems"
        [items]="items" primaryKey="name"
        [callBack]="loadData"
        [totalRecords]="totalRecords"
        [onRowSelect]="onRowSelect" [onRowUnselect]="onRowUnselect">
  </custom-list>
  `,
  imports: [
    CustomListComponent
  ],
  encapsulation: ViewEncapsulation.None,
})
export class OnlineRoleListComponent implements OnInit, OnDestroy {
  @Input() preSelection;
  @Input() items;

  tableEvent: any;
  selectedItems =[];
  loadData = (event): void => {
    if(this.preSelection==null) {
      return;
    }
    this.tableEvent = event;
    const data = {
      lazyEvent: this.tableEvent,
      sapId: this.preSelection.selectedSAP,
      selectedIds:this.preSelection.selectedusers,
    };

    this.riskAnalysisOnlineService.roleSelectedList(data).pipe(
        map((apiResponse) => {
          this.items = apiResponse.data.rows;
          this.totalRecords = apiResponse.data.records;
        }),
        takeUntil(this.subject),
    ).subscribe();
  };

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
  isAllChecked: boolean;


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
      command: () => this.openRoleSelectDialog(),
    },
  ];
  onRowSelect = (event): void => {
    this.selectedItems.push(event.data.name);
  };
  onRowUnselect = (event): void => {
    this.selectedItems = this.selectedItems.filter(
        obj => obj !== event.data.name);
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
    this.selectedItems.forEach(
        p => this.preSelection.selectedusers =
            this.preSelection.selectedusers.filter(obj => obj !== p));
    this.loadData(this.tableEvent);
  }

  removeAll() {
    this.preSelection.selectedusers = [];
    this.loadData(this.tableEvent);
  }

  openRoleSelectDialog() {
    if (this.preSelection !== null && this.preSelection !== undefined) {
      const dialogRef = this.dialog.open(OnlineRoleSelectListComponent, {
        autoFocus: false,
        maxHeight: '110vh',
        width: '70%',
        disableClose: true,
        data: {
          preSelection: this.preSelection,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        this.preSelection.selectedusers = result.selectedRolesIds;
        this.loadData(this.tableEvent);
      });
    }

  }

  private openDetail(data) {
    const roleDetail = {userId: data.name, sapId: this.preSelection.selectedSAP};
    const dialogRef = this.dialog.open(OnlineRoleDetailComponent, {
      autoFocus: false,
      maxHeight: '80vh',
      width: '70%',
      disableClose: false,
      data: roleDetail
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.preSelection.selectedusers = result.selectedRolesIds;
      this.loadData(this.tableEvent);
    });
  }
  ngOnDestroy(): void {
    this.subject.next(true);
    this.subject.complete();

  }
}
