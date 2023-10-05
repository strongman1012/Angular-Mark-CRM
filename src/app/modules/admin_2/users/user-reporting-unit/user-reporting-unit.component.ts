import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AdminUserService} from '../admin-user.service';
import {PasswordService} from '../../../../shared/password.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {
  FormValidationService,
} from '../../../../shared/form-validation.service';
import {NotificationService} from '../../../../shared/notification.service';
import {Subject, takeUntil, tap} from 'rxjs';

@Component({
  selector: 'app-user-reportings',
  templateUrl: './user-reporting-unit.component.html',
  styleUrls: ['./user-reporting-unit.component.scss'],
})
export class UserReportingUnitComponent implements OnInit, OnDestroy {
  private subject = new Subject<boolean>();
  public form: FormGroup;
  public user: any;
  reportingUnits: any[];
  targetReportingUnits: any[] = [];
  loading: boolean;

  constructor(
      @Inject(MAT_DIALOG_DATA) public dialogData: any,
      private userService: AdminUserService,
      private passwordService: PasswordService,
      private formBuilder: FormBuilder,
      private formValidation: FormValidationService,
      private notificationService: NotificationService,
      private dialogRef: MatDialogRef<UserReportingUnitComponent>,
  ) {
  }

  ngOnInit(): void {
    this.user = this.dialogData.user;

    if (this.user) {
      this.initReportingUnits();
    }
  }

  private initReportingUnits() {

    setTimeout(() => {
      this.userService.reportingUnits(this.user.id).pipe(
          tap((apiResponse) => {
            this.reportingUnits = apiResponse.data.ruList.filter(p =>
                !apiResponse.data.userVO.reportingUnitIds.includes(p.id));
            this.targetReportingUnits = apiResponse.data.ruList.filter(p =>
                apiResponse.data.userVO.reportingUnitIds.includes(p.id));
          }),
          takeUntil(this.subject),
      ).subscribe();
    }, 10);
  }

  ngOnDestroy(): void {
    this.subject.next(true);
    this.subject.complete();
  }

  saveReportingUnits() {
    const data = {
      id: this.user.id,
      username: this.user.username,
      reportingUnitIds: this.targetReportingUnits.map(item => item.id),
    };
    this.userService.saveReportingUnits(data).pipe(
        tap((apiResponse) => {
          this.notificationService.show(apiResponse);
        }),
        takeUntil(this.subject),
    ).subscribe();
  }
}
