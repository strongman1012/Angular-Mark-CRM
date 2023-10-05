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
  OnlineRiskDetailComponent,
} from '../risk-detail/online-risk-detail.component';

@Component({
  selector: 'online-risk-select-list',
  template: '',
  encapsulation: ViewEncapsulation.None,
})
export class OnlineRiskSelectionListComponent implements OnInit, OnDestroy {

  cols = [
    {
      name: 'name', type: 'text', header: 'Risk Id',
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

  isAllChecked: boolean;
  items: [];

  totalRecords: any;
  private subject = new Subject<boolean>();
  private tableEvent: any;

  private selectedRiskIds = [];
  private selectedRiskFirstIds = [];
  private favoriteIdStr: any;

  /**
   * Constructor
   */
  constructor(
      @Inject(MAT_DIALOG_DATA) public dialogData: any,
      private dialogRef: MatDialogRef<OnlineRiskSelectionListComponent>,
      private _loadSelectionService: LoadSelectionService,
      private apiService: RiskAnalysisOnlineService,
      public dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {
    this.selectedRiskFirstIds = this.dialogData.preSelection.selectedRisks;
  }

  onRowSelect = (event): void => {
    this.selectedRiskIds.push(event.data.id);
    this.selectedRiskFirstIds.push(event.data.id);

  };
  onRowUnselect = (event): void => {
    this.selectedRiskIds = this.selectedRiskIds.filter(
        obj => obj !== event.data.id);
    this.selectedRiskFirstIds = this.selectedRiskFirstIds.filter(
        obj => obj !== event.data.id);
  };

  loadData = (event): void => {
    this.tableEvent = event;

    const data = {
      lazyEvent: this.tableEvent,
      selectedRisks: this.selectedRiskFirstIds,
      favoriteIdStr: this.dialogData.preSelection.favoriteIdStr,
    };

    this.apiService.findRisks(data).pipe(
        map((apiResponse) => {
          this.items = apiResponse.data.rows;
          this.totalRecords = apiResponse.data.records;

        }),
        takeUntil(this.subject),
    ).subscribe();
  };

  saveSelected() {
    this.loadData(this.tableEvent);
  }

  closeDialog() {
    this.dialogRef.close({selectedRiskIds: this.selectedRiskIds});
  }

  saveAll() {
    const data = {
      lazyEvent: this.tableEvent,
      selectedRisks: [],
    };
    this.apiService.findAllRisks(data).pipe(
        tap((apiResponse) => {
          this.dialogRef.close(
              {selectedRiskIds: apiResponse.data.selectedRisks});
        }),
        takeUntil(this.subject),
    ).subscribe();

  }

  ngOnDestroy(): void {
    this.subject.next(true);
    this.subject.complete();

  }

  private openDetail(risk) {
    const data = {riskId: risk.name};
    this.dialog.open(OnlineRiskDetailComponent, {
      autoFocus: false,
      maxHeight: '80vh',
      width: '70%',
      disableClose: false,
      data: data,
    });

  }
}
