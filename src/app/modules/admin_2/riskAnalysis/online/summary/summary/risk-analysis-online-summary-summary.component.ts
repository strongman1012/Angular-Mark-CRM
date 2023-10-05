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
  selector: 'risk-analysis-online-summary-summary',
  template: ``,
  // templateUrl: './risk-analysis-online-summary-summary.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class RiskAnalysisOnlineSummarySummaryComponent implements OnInit, OnDestroy, OnChanges {

  @Input() public jobId;

  private subject = new Subject<boolean>();
  private tableEvent: any;
   items: any;
   totalRecords: any;
  columns = [

    {name: 'userName', type: 'text', header: 'User Name',},
    {name: 'bname', type: 'text', header: 'User ID',},
    {name: 'type', type: 'text', header: 'Type',},
    {name: 'riskName', type: 'text', header: 'Risk Id',},
    {name: 'riskDesc', type: 'text', header: 'Description',},
    {name: 'riskType', type: 'text', header: 'Type',},
    {name: 'businessProcess', type: 'text', header: 'Business Proc',},
    {name: 'businessSubProcess', type: 'text', header: 'Sub Proc',},
    {name: 'ruleName', type: 'text', header: 'Rule',},
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
      this.service.resultSummary({
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
