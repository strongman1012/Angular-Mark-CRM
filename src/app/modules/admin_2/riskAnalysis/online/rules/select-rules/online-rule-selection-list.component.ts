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
  OnlineRuleDetailComponent
} from '../rule-detail/online-rule-detail.component';
import {
  OnlineUserSelectListComponent
} from '../../users/select-users/online-user-select-list.component';

@Component({
  selector: 'online-rule-select-list',
  template: ``,
  // templateUrl: './online-rule-selection-list.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class OnlineRuleSelectionListComponent implements OnInit, OnDestroy {

  cols = [
    {
      name: 'ruleName', type: 'text', header: 'Rule ID',
      width: 200,
      color: '#008cf0',
      iconClass: 'pi-angle-right',
      onClick: data => this.openDetail(data),
    },
    {name: 'ruleDescription', type: 'text', header: 'Description',},
    {name: 'businessProcess.name', type: 'text', header: 'Business Process',},
    {name: 'businessProcess.subProcessNames', type: 'text', header: 'Sub Process',},
    {name: 'ruleType.name', type: 'text', header: 'Rule Type',},
  ];

  isAllChecked: boolean;
  items: [];

  totalRecords: any;
  private subject = new Subject<boolean>();
  private tableEvent: any;
  private preSelection: any;

  private selectedRuleIds= [];
  private selectedRiskFirstIds= [];

  /**
   * Constructor
   */
  constructor(
      @Inject(MAT_DIALOG_DATA) public dialogData: any,
      private dialogRef: MatDialogRef<OnlineRuleSelectionListComponent>,
      private _loadSelectionService: LoadSelectionService,
      private apiService: RiskAnalysisOnlineService,
      public dialog: MatDialog,
  ) {

  }

  ngOnInit(): void {

    this.selectedRiskFirstIds = this.dialogData.preSelection.selectedRules;
  }


  onRowSelect = (event): void => {
    this.selectedRuleIds.push(event.data.id);
    this.selectedRiskFirstIds.push(event.data.id);

  };
  onRowUnselect = (event): void => {
    this.selectedRuleIds = this.selectedRuleIds.filter(
        obj => obj !== event.data.id);
    this.selectedRiskFirstIds = this.selectedRiskFirstIds.filter(
        obj => obj !== event.data.id);
  };

  loadData = (event): void => {
    this.tableEvent = event;

    const data = {
      lazyEvent: this.tableEvent,
      selectedRules: this.selectedRiskFirstIds,
      favoriteIdStr: this.dialogData.preSelection.favoriteIdStr
    };

    this.apiService.findRules(data).pipe(
        map((apiResponse) => {
          this.items = apiResponse.data.content;
          this.totalRecords = apiResponse.data.records;
        }),
        takeUntil(this.subject),
    ).subscribe();
  };

  saveSelected() {
    this.loadData(this.tableEvent);
  }
  closeDialog() {
    this.dialogRef.close({selectedRuleIds: this.selectedRuleIds});
  }
  saveAll() {
    const data = {
      lazyEvent: this.tableEvent,
      selectedRules: this.preSelection.selectedRules
    };
    this.apiService.findAllRules(data).pipe(
        tap((apiResponse) => {
          this.dialogRef.close({selectedRuleIds: apiResponse.data.selectedRules});
        }),
        takeUntil(this.subject),
    ).subscribe();

  }

  ngOnDestroy(): void {
    this.subject.next(true);
    this.subject.complete();

  }

  private openDetail(rule) {
    const data = {ruleId: rule.id};
    this.dialog.open(OnlineRuleDetailComponent, {
      autoFocus: false,
      maxHeight: '80vh',
      width: '70%',
      disableClose: false,
      data: data
    });

  }


}
