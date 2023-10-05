import {
  AfterViewInit,
  Component, Input, OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {map, Subject, takeUntil} from 'rxjs';
import {RiskAnalysisOnlineService} from '../risk-analysis-online.service';
import {NotificationService} from '../../../../../shared/notification.service';

@Component({
  selector: 'risk-analysis-online-summary',
  template: ``,
  // templateUrl: './risk-analysis-online-summary.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class RiskAnalysisOnlineSummaryComponent implements OnInit, OnDestroy {

  @Input()  public riskData;
  menuItems = [
    {
      label: 'Run',
      icon: 'pi pi-user-plus',
      command: () => this.startAnalysis(),
    },
    {
      label: 'Run in Background',
      icon: 'pi pi-user-edit',
      command: () => this.startAnalysisInBackground(),
    },

  ];
  private subject = new Subject<boolean>();
  jobId: any;
  profileId: any;
   loading=false;

  /**
   * Constructor
   */
  constructor(
      private _formBuilder: FormBuilder,
      public dialog: MatDialog,   private notificationService: NotificationService,
      private riskAnalysisOnlineService: RiskAnalysisOnlineService,
  ) {
  }

  ngOnDestroy(): void {
    this.subject.next(true);
    this.subject.complete();

  }

  ngOnInit(): void {
  }

  private startAnalysis() {
    this.loading=true;
    this.riskData.background = false;
    this.riskAnalysisOnlineService.startAnalysis( this.riskData).pipe(
        map((apiResponse) => {
          this.jobId = apiResponse.data.jobId;
          this.profileId = apiResponse.data.profileId;
          this.loading=false;
        }),
        takeUntil(this.subject),
    ).subscribe();
  }

  private startAnalysisInBackground() {
    this.riskData.background = true;
    this.riskAnalysisOnlineService.startAnalysis( this.riskData).pipe(
        map((apiResponse) => {
          this.notificationService.show(apiResponse);
        }),
        takeUntil(this.subject),
    ).subscribe();
  }
}
