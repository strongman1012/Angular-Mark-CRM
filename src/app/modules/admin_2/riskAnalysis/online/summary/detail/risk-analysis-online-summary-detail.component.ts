import {
  AfterViewInit,
  Component, Input, OnChanges, OnDestroy,
  OnInit,
  SimpleChanges,
  ViewEncapsulation,
} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {map, Subject, takeUntil} from 'rxjs';
import {
  NotificationService,
} from '../../../../../../shared/notification.service';
import {RiskAnalysisOnlineService} from '../../risk-analysis-online.service';

@Component({
  selector: 'risk-analysis-online-summary-detail',
  template: ``,
  // templateUrl: './risk-analysis-online-summary-detail.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class RiskAnalysisOnlineSummaryDetailComponent implements OnInit, OnDestroy, OnChanges {

  @Input() public jobId;

  private subject = new Subject<boolean>();
  private tableEvent: any;
   items: any;
   totalRecords: any;
  columns = [

    {name: 'ruleId', type: 'text', header: 'RuleID',},
    {name: 'auth', type: 'text', header: 'Auth',},
    {name: 'fld', type: 'text', header: 'FLD',},
    {name: 'roleName', type: 'text', header: 'Role Name',},
    {name: 'object', type: 'text', header: 'Object',},
    {name: 'riskName', type: 'text', header: 'Risk Name',},
    {name: 'userName', type: 'text', header: 'USERNAME',},
    {name: 'bname', type: 'text', header: 'BNAME',},
  ];
  /**
   * Constructor
   */
  constructor(
      private _formBuilder: FormBuilder,
      public dialog: MatDialog,

      private notificationService: NotificationService,
      private service: RiskAnalysisOnlineService,
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.jobId !== null && this.jobId !== undefined) {
      this.loadData(this.tableEvent);
    }
    }
  loadData = (event): void => {
    this.tableEvent = event;
    if (this.jobId == null) {
      return;
    }
    setTimeout(() => {
      this.service.resultsDetail({
        lazyEvent: JSON.stringify(event),
        jobId: this.jobId,
      }).pipe(
          map((apiResponse) => {
            this.items = apiResponse.data.rows;
            this.totalRecords = apiResponse.data.records;
          }),
          takeUntil(this.subject),
      ).subscribe();
    }, 10);
  };
  ngOnDestroy(): void {
    this.subject.next(true);
    this.subject.complete();

  }

  ngOnInit(): void {
  }

  private openDetail(data) {

  }
}
