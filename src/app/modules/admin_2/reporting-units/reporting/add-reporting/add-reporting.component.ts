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
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {
  FormValidationService,
} from '../../../../../shared/form-validation.service';
import {PasswordService} from '../../../../../shared/password.service';
import {ReportingService} from '../reporting.service';

@Component({
  selector: 'add-reporting',
  templateUrl: './add-reporting.component.html',
  styleUrls: ['./add-reporting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddReportingComponent implements OnInit, OnDestroy {

  private subject = new Subject<boolean>();

  public title = 'Add Reporting Unit';
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
  firstFormGroup: any;
  secondFormGroup: any;
  sapSystems: any;
  targetSapSystems: any[] = [];
  resultTable: any[] = [];

  constructor(
      @Inject(MAT_DIALOG_DATA) public dialogData: any,
      private reportingService: ReportingService,
      private passwordService: PasswordService,
      private formBuilder: FormBuilder,
      private formValidation: FormValidationService,
      private dialogRef: MatDialogRef<AddReportingComponent>,
  ) {
  }

  ngOnInit(): void {
    this.initFormFields();
  }

  private initFormFields() {
    let requestStart = this.reportingService.initForm();
    if (this.reportingId) {
      requestStart = this.reportingService.initFormForUpdate(this.reportingId);
    }
    this.form$ = requestStart.pipe(
        map((apiResponse) => {
          this.sapSystems = apiResponse.data.sapSystems;
          this.createFirstForm();
          return this.createSecondForm();
        }),
    );

  }

  private createFirstForm(): FormGroup {
    this.firstFormGroup = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
      driverClassName: ['', [Validators.required]],
      dbHost: ['', [Validators.required]],
      dataBase: ['', [Validators.required]],
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    return this.firstFormGroup;
  }

  private createSecondForm(): FormGroup {
    this.secondFormGroup = this.formBuilder.group({
      name: ['', [Validators.required]],

      notificationScope: ['', [Validators.required]],
      sapSystemIds: [''],
    });

    return this.secondFormGroup;
  }

  saveFirst() {

    const data = {
      reportingUnit: {},
      dbConnection: this.firstFormGroup.value,
    };
    this.reportingService.saveFirst(data).pipe(
        tap((apiResponse) => {
          //this.notificationService.show(apiResponse);
          //  this.dialogRef.close(true);
        }),
        catchError((err) => {
          this.formValidation.validateAllFields(this.firstFormGroup,
              err.error.data);
          return throwError(() => err);
        }),
        takeUntil(this.subject),
    ).subscribe();
  }

  saveSecond() {
    this.secondFormGroup.value['sapSystemIds'] = this.targetSapSystems.map(
        item => item.id);
    const data = {
      reportingUnit: this.secondFormGroup.value,
      dbConnection: this.firstFormGroup.value,
    };
    this.reportingService.saveSecond(data).pipe(
        tap((apiResponse) => {
          const resp = apiResponse.message.split(';');
          this.resultTable = [];
          this.resultTable.push({key: 'Database Creation', value: resp[0]});
          this.resultTable.push({key: 'Structure Setup', value: resp[1]});
          this.resultTable.push({key: 'Setup Reporting', value: resp[2]});
          this.resultTable.push({key: 'Connect DB', value: resp[3]});

        }),
        catchError((err) => {
          this.formValidation.validateAllFields(this.secondFormGroup,
              err.error.data);
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
