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

import {SapSystemService} from '../sap-system.service';
import {MatSelectChange} from '@angular/material/select';
import {ActivatedRoute} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ApiResponse} from '../../../../../backend-api/models/api-response';
import {
  FormValidationService,
} from '../../../../../shared/form-validation.service';
import {NotificationService} from '../../../../../shared/notification.service';
import {PasswordService} from '../../../../../shared/password.service';

@Component({
  selector: 'admin-sap-system-add',
  templateUrl: './add-sap-system.component.html',
  styleUrls: ['./add-sap-system.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddSapSystemComponent implements OnInit, OnDestroy {

  private subject = new Subject<boolean>();
  public form: FormGroup;
  public title = 'Add Sap System';
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

  private sapSystemId: any;

  constructor(
      @Inject(MAT_DIALOG_DATA) public dialogData: any,
      private sapSystemService: SapSystemService,
      private passwordService: PasswordService,
      private formBuilder: FormBuilder,
      private formValidation: FormValidationService,
      private notificationService: NotificationService,
      private route: ActivatedRoute,
      private dialogRef: MatDialogRef<AddSapSystemComponent>,
  ) {
  }

  ngOnInit(): void {
    /* this.route.queryParams.subscribe((params) => {
         this.sapSystemId = params['id'];
     });

     */
    // this.sapSystemId = this.dialogData.sapSystemId;
    this.initFormFields();
  }

  typeSelection($event: MatSelectChange) {
    this.enableDisableFields($event.value);
  }

  private enableDisableFields(isOffline: boolean) {
    if (isOffline) {
      this.form.controls.hostName.disable();
      this.form.controls.sysNr.disable();
      this.form.controls.userName.disable();
      this.form.controls.password.disable();
      this.form.controls.clientNumber.disable();
      this.form.controls.hideInUserAdmin.disable();
      this.form.controls.hanaSystem.disable();
      this.form.controls.customDbtablog.disable();
      this.form.controls.poolCapacity.disable();
      this.form.controls.peakLimit.disable();
      this.form.controls.pooled.disable();
    } else {
      this.form.controls.hostName.enable();
      this.form.controls.sysNr.enable();
      this.form.controls.userName.enable();
      this.form.controls.password.enable();
      this.form.controls.clientNumber.enable();
      this.form.controls.hideInUserAdmin.enable();
      this.form.controls.hanaSystem.enable();
      this.form.controls.customDbtablog.enable();
      this.form.controls.poolCapacity.enable();
      this.form.controls.peakLimit.enable();
      this.form.controls.pooled.enable();
    }
  }

  pooledChange($event: MatSelectChange) {
    this.enableDisablePooled($event.value);
  }

  private enableDisablePooled(isPooled: boolean) {
    if (isPooled) {
      this.form.controls.poolCapacity.enable();
      this.form.controls.peakLimit.enable();
    } else {
      this.form.controls.poolCapacity.disable();
      this.form.controls.peakLimit.disable();
    }

  }

  private initFormFields() {
    let requestStart = this.sapSystemService.initForm();
    if (this.sapSystemId) {
      requestStart = this.sapSystemService.initFormForUpdate(this.sapSystemId);
    }
    this.form$ = requestStart.pipe(
        map((apiResponse) => {
          const sapSystem = apiResponse.data.sapSystem;
          this.languages = Object.entries(apiResponse.data.languagMap);
          this.timezones = apiResponse.data.timezones;
          this.systemRoles = apiResponse.data.systemRoles;
          return this.createForm(sapSystem);
        }),
    );

  }

  private createForm(sapSystem): FormGroup {
    this.form = this.formBuilder.group(
        {
          id: [sapSystem.id],
          offline: [sapSystem.offline, [Validators.required]],
          destinationName: [sapSystem.destinationName, [Validators.required]],
          description: [sapSystem.description, [Validators.required]],
          hostName: [sapSystem.hostName, [Validators.required]],
          sysNr: [sapSystem.sysNr, [Validators.required]],
          userName: [sapSystem.userName, [Validators.required]],
          password: [sapSystem.password, [Validators.required]],
          languageCode: [sapSystem.languageCode, Validators.required],
          pooled: [sapSystem.pooled, Validators.required],
          poolCapacity: [sapSystem.poolCapacity, Validators.required],
          peakLimit: [sapSystem.peakLimit, Validators.required],
          clientNumber: [sapSystem.clientNumber, Validators.required],
          hideInUserAdmin: [sapSystem.hideInUserAdmin, Validators.required],
          SID: [sapSystem.SID, Validators.required],
          timeZone: [
            sapSystem.timeZone === null ? null : sapSystem.timeZone.id,
            Validators.required],
          centralRepo: [sapSystem.centralRepo, Validators.required],
          hanaSystem: [sapSystem.hanaSystem, Validators.required],
          customDbtablog: [sapSystem.customDbtablog, Validators.required],
          systemRole: [sapSystem.systemRole, Validators.required],
          licenseCheck: [sapSystem.licenseCheck, Validators.required],

        },
    );
    if (sapSystem.id !== null) {
      this.form.controls.offline.disable();
      this.form.controls.destinationName.disable();
    }
    this.enableDisableFields(this.form.controls.offline.value);
    this.enableDisablePooled(this.form.controls.pooled.value);
    return this.form;
  }

  storeOrUpdateSapSystem() {
    this.form.value['timeZone'] = this.timezones.find(
        p => p.id === this.form.value['timeZone']);

    let httpRequest: Observable<ApiResponse>;
    if (this.sapSystemId) {
      httpRequest = this.sapSystemService.update(this.sapSystemId,
          this.form.getRawValue());
    } else {
      httpRequest = this.sapSystemService.save(this.form.value);
    }
    httpRequest.pipe(
        tap((apiResponse) => {
          this.notificationService.show(apiResponse);
          this.dialogRef.close(true);
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
