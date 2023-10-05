import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoadSelectionService } from 'app/backend-api/load-selection.service';
import { RiskAnalysisOnlineService } from 'app/modules/acm/riskAnalysis/risk-analysis-online.service';
import { OnlineRiskDetailComponent } from 'app/modules/admin_2/riskAnalysis/online/risks/risk-detail/online-risk-detail.component';
import { OnlineRiskSelectionListComponent } from 'app/modules/admin_2/riskAnalysis/online/risks/select-risks/online-risk-selection-list.component';
import { Subject, map, takeUntil } from 'rxjs';
import { CustomListComponent } from './custom-list.component';

@Component({
  standalone: true,
  selector: 'online-risk-list',
  template: `
  <custom-list
        header="Risk List"
        [columns]="cols"
        [menuItems]="menuItems"
        [items]="items" primaryKey="id"
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
export class OnlineRiskListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() preSelection;
  cols = [
    {
      name: 'name', type: 'text', header: 'Risk ID',
      width: 200,
      color: '#008cf0',
      iconClass: 'pi-angle-right',
      onClick: data => this.openDetail(data),
    },
    {name: 'riskDescription', type: 'text', header: 'Description'},
    {name: 'businessProcess.name', type: 'text', header: 'Business Process'},
    {
      name: 'businessProcess.subProcessNames',
      type: 'text',
      header: 'Sub Process',
    },
    {name: 'riskType.name', type: 'text', header: 'Risk Type'},
  ];

  items: [];
  selectedRow: any;
  totalRecords: any;
  loading: any;
  private subject = new Subject<boolean>();
  private selectedRiskIds = [];
  private tableEvent: any;
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
      command: () => this.openRiskSelection(),
    },
  ];
  private selectedItem: any;

  /**
   * Constructor
   */
  constructor(
      private _loadSelectionService: LoadSelectionService,
      private apiService: RiskAnalysisOnlineService,
      public dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.selectedRiskIds = [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.preSelection !== null && this.preSelection !== undefined) {

      this.loadData(this.tableEvent);
    }
  }

  loadData = (event): void => {
    this.tableEvent = event;
    if (this.preSelection.selectedRisks == null) {
      return;
    }
    this.loading = true;
    const data = {};
    setTimeout(() => {
      this.apiService.selectedRiskList({
        lazyEvent: this.tableEvent,
        riskIds: this.preSelection.selectedRisks,
      }).pipe(
          map((apiResponse) => {
            this.items = apiResponse.data.rows;
            this.totalRecords = apiResponse.data.records;
            this.loading = false;
          }),
          takeUntil(this.subject),
      ).subscribe();
    }, 10);
  };

  ngOnDestroy(): void {
    this.subject.next(true);
    this.subject.complete();

  }

  onRowSelect = (event): void => {
    this.selectedRiskIds.push(event.data.id);
  };
  onRowUnselect = (event): void => {
    this.selectedRiskIds = this.selectedRiskIds.filter(
        obj => obj !== event.data.id);
  };

  private remove() {

    this.selectedRiskIds.forEach(
        p => this.preSelection.selectedRisks =
            this.preSelection.selectedRisks.filter(obj => obj !== p));

    this.loadData(this.tableEvent);
  }

  private removeAll() {
    this.selectedRiskIds = [];
    this.preSelection.selectedRisks = this.selectedRiskIds;
    this.loadData(this.tableEvent);
  }

  private openDetail(risk) {
    const data = {riskId: risk.name};
    const dialogRef = this.dialog.open(OnlineRiskDetailComponent, {
      autoFocus: false,
      maxHeight: '80vh',
      width: '70%',
      disableClose: false,
      data: data,
    });

    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  openRiskSelection() {
    if (this.preSelection !== null && this.preSelection !== undefined) {
      const dialogRef = this.dialog.open(OnlineRiskSelectionListComponent, {
        autoFocus: false,
        maxHeight: '110vh',
        width: '70%',
        disableClose: true,
        data: {
          preSelection: this.preSelection,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result.selectedRiskIds !== null) {
          result.selectedRiskIds.forEach(
              p => this.preSelection.selectedRisks.push(p));
          this.loadData(this.tableEvent);
        }

      });
    }

  }
}
