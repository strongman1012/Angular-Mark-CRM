import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {map, Subject, takeUntil} from 'rxjs';
import {ReportingService} from '../reporting.service';
import {NotificationService} from '../../../../../shared/notification.service';

@Component({
  selector: 'app-reporting-detail',
  templateUrl: './reporting-detail.component.html',
  styleUrls: ['./reporting-detail.component.scss'],
})
export class ReportingDetailComponent implements OnInit, OnDestroy {
  private subject = new Subject<boolean>();
  private reportingUnit: any;

  users: any;
  cols = [

    {field: 'username', type: 'text', header: 'Username'},
    {field: 'firstName', type: 'text', header: 'First Name'},
    {field: 'lastName', type: 'text', header: 'Last Name'},
    {field: 'email', type: 'text', header: 'Email'},

  ];
  selectedColumns = this.cols;

  constructor(
      @Inject(MAT_DIALOG_DATA) public dialogData: any,
      private apiService: ReportingService,
      private notificationService: NotificationService,
      private dialogRef: MatDialogRef<ReportingDetailComponent>) {
  }

  ngOnInit(): void {
    this.reportingUnit = this.dialogData.reportingUnit;
    this.initDetail();
  }

  public initDetail() {
    this.apiService.detail(this.reportingUnit.id).pipe(
        map((apiResponse) => {
          if (apiResponse.success) {
            this.users = apiResponse.data;
          } else {
            this.notificationService.show(apiResponse);
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
