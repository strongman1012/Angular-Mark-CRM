import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {
  catchError,
  map,
  Observable,
  Subject,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';
import {
  FormValidationService,
} from '../../../../../shared/form-validation.service';
import {PasswordService} from '../../../../../shared/password.service';
import {ReportingService} from '../reporting.service';
import {ActivatedRoute} from '@angular/router';
import {NotificationService} from '../../../../../shared/notification.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'edit-reporting',
  templateUrl: './edit-reporting.component.html',
  styleUrls: ['./edit-reporting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditReportingComponent implements OnInit, OnDestroy {

  private subject = new Subject<boolean>();

  public title = 'Edit Reporting Unit';
  public languages: [string, string][];
  public yesNoFields: any[] = [
    {value: null, text: 'Please select'}, {value: true, text: 'YES'}, {
      value: false,
      text: 'NO',
    }];
  public types: any[] = [
    {value: true, text: 'Offline'},
    {value: false, text: 'Online'}];
  public timezones: any[] = [];
  public systemRoles: any[] = [];
  form$: Observable<FormGroup>;

  private reportingId: any;
  form: any;

  sapSystems: any;
  targetSapSystems: any[] = [];

  dbConnections: any[] = [];

  constructor(
      @Inject(MAT_DIALOG_DATA) public dialogData: any,
      private reportingService: ReportingService,
      private passwordService: PasswordService,
      private formBuilder: FormBuilder,
      private formValidation: FormValidationService,
      private route: ActivatedRoute,
      private notificationService: NotificationService,
      private dialogRef: MatDialogRef<EditReportingComponent>,
  ) {
  }

  ngOnInit(): void {
    this.reportingId = this.dialogData.reportingId;

    this.initFormFields();
  }

  private initFormFields() {
    this.form$ = this.reportingService.initFormForUpdate(this.reportingId).pipe(
        map((apiResponse) => {
          //this.sapSystems = apiResponse.data.sapSystems;
          this.dbConnections = apiResponse.data.dbConnections;
          this.form = this.formBuilder.group({
            id: [apiResponse.data.reportingUnit.id],
            name: [apiResponse.data.reportingUnit.name],
            sapSystemIds: [''],
            dbConnectionId: [
              apiResponse.data.reportingUnit.dbConnection.id,
              [Validators.required]],
            notificationScope: [
              apiResponse.data.reportingUnit.notificationScope,
              [Validators.required]],
            expiredSODJobsDeletion: [
              apiResponse.data.reportingUnit.expiredSODJobsDeletion,
              [Validators.required]],
          });
          this.sapSystems = apiResponse.data.sapSystems.filter(p =>
              !apiResponse.data.reportingUnit.sapSystems.map(q => q.id).
                  includes(p.id));

          this.targetSapSystems = apiResponse.data.sapSystems.filter(p =>
              apiResponse.data.reportingUnit.sapSystems.map(q => q.id).
                  includes(p.id));
          this.form.controls.name.disable();
          return this.form;

        }),
    );

  }

  update() {

    const data = this.form.getRawValue();
    data.sapSystemIds = this.targetSapSystems.map(p => p.id);

    this.reportingService.update(this.reportingId, data).pipe(
        tap((apiResponse) => {
          this.notificationService.show(apiResponse);
          //  this.dialogRef.close(true);
        }),
        catchError((err) => {
          this.formValidation.validateAllFields(this.form, err.error.data);
          return throwError(() => err);
        }),
        takeUntil(this.subject),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.subject.next(true);
    this.subject.complete();
  }

}
