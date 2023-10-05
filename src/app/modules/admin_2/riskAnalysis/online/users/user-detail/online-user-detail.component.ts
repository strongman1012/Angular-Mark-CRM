import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {map, Subject, takeUntil} from 'rxjs';
import {RiskAnalysisOnlineService} from '../../risk-analysis-online.service';

@Component({
  selector: 'online-user-detail',
  template: ``,
  // templateUrl: './online-user-detail.component.html',
})
export class OnlineUserDetailComponent implements OnInit, OnDestroy {
  private subject = new Subject<boolean>();
  private reportingUnit: any;

  items: any;
  cols = [
    {name: 'name', type: 'text', header: 'Role'},
    {name: 'roleDesc.description', type: 'text', header: 'Description'},
    {name: 'fromDateStr', type: 'text', header: 'From Date [YYYY-MM-DD]'},
    {name: 'toDateStr', type: 'text', header: 'To Date [YYYY-MM-DD]'},
  ];
  primaryKey: 'name';
  user: any;

  constructor(
      @Inject(MAT_DIALOG_DATA) public dialogData: any,
      private apiService: RiskAnalysisOnlineService,
      private dialogRef: MatDialogRef<OnlineUserDetailComponent>,
  ) {
  }

  ngOnInit(): void {
    // this.reportingUnit = this.dialogData.reportingUnit;
    this.initDetail();
  }

  public initDetail() {
    const data = {userId: this.dialogData.userId, sapId: this.dialogData.sapId};

    this.apiService.userDetail(data).pipe(
        map((apiResponse) => {
          if (apiResponse.success) {
            this.items = apiResponse.data.roles;
            this.user = apiResponse.data.userBase;
          }
        }),
        takeUntil(this.subject),
    ).subscribe();

  }

  ngOnDestroy(): void {
    this.subject.next(true);
    this.subject.complete();
  }
}
