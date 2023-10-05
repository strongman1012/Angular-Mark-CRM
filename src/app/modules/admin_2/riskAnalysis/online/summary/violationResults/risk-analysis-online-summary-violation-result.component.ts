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
  selector: 'risk-analysis-online-summary-violation-result',
  template: ``,
  // templateUrl: './risk-analysis-online-summary-violation-result.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class RiskAnalysisOnlineSummaryViolationResultComponent implements OnInit, OnDestroy, OnChanges {

  @Input() public jobId;

  private subject = new Subject<boolean>();
  private tableEvent: any;
   items: any;
   totalRecords: any;
  columns = [

    {name: 'bname', type: 'text', header: 'User/Role ID',},
    {name: 'vcount', type: 'text', header: 'Number of Violations',},
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
      this.service.violationResults({
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
