import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
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
} from '../../../../shared/form-validation.service';
import {PasswordService} from '../../../../shared/password.service';
import {LdapService} from '../ldap.service';
import {NotificationService} from '../../../../shared/notification.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'add-ldap',
  templateUrl: './add-ldap.component.html',
  styleUrls: ['./add-ldap.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddLdapComponent implements OnInit, OnDestroy {

  private subject = new Subject<boolean>();

  public title = 'Add LDAP Configuration';
  public languages: [string, string][];

  public authenticationTypes: any[] = [
    {value: null, text: 'Please select'},
    {value: 'SIMPLE', text: 'Bind (simple)'},
    {value: 'DIGEST-MD5', text: 'Bind (Digest-MD5)'},
    {value: 'GSSAPI', text: 'Bind (Kerberos v5)'},
    {value: 'EXTERNAL', text: 'Bind (External)'},
    {value: 'PASSWORD-PLAIN', text: 'Password compare (Plain)'},
    {value: 'PASSWORD-SHA', text: 'Password compare (SHA encoded)'},
    {value: 'PASSWORD-MD5', text: 'Password compare (MD5 encoded)'},

  ];
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

  @ViewChild('testName')
  testName: ElementRef;

  reportingUnits: any[] = [];
  testValue: any = null;
  private ldapItem: any;

  constructor(
      @Inject(MAT_DIALOG_DATA) public dialogData: any,
      private ldapService: LdapService,
      private passwordService: PasswordService,
      private formBuilder: FormBuilder,
      private formValidation: FormValidationService,
      private notificationService: NotificationService,
      private dialogRef: MatDialogRef<AddLdapComponent>,
  ) {
  }

  ngOnInit(): void {
    if (this.dialogData) {
      this.ldapItem = this.dialogData.ldapItem;
      this.testValue = '';
    }
    this.initFormFields();
  }

  private initFormFields() {
    let requestStart = this.ldapService.initForm();

    if (this.ldapItem != null) {
      requestStart = this.ldapService.editForm(this.ldapItem.id);
    }

    this.form$ = requestStart.pipe(
        map((apiResponse) => {
          this.reportingUnits = apiResponse.data.ruMap;
          this.reportingUnits = Object.entries(this.reportingUnits);
          return this.createFirstForm(apiResponse.data.ldapConfiguration);
        }),
    );

  }

  private createFirstForm(ldapConfiguration: any): FormGroup {
    this.firstFormGroup = this.formBuilder.group({
      name: [ldapConfiguration.name, [Validators.required]],
      authenticationType: [
        ldapConfiguration.authenticationType,
        [Validators.required]],
      hostname: [ldapConfiguration.hostname, [Validators.required]],
      ssl: [ldapConfiguration.ssl],
      port: [ldapConfiguration.port, [Validators.required]],
      username: [ldapConfiguration.username, [Validators.required]],
      password: [ldapConfiguration.password],
      baseDn: [ldapConfiguration.baseDn, [Validators.required]],
      searchFilter: [ldapConfiguration.searchFilter, [Validators.required]],
      reportingUnitIds: [
        ldapConfiguration.reportingUnitIds,
        [Validators.required]],
      priority: [ldapConfiguration.priority, [Validators.required]],
      active: [ldapConfiguration.active],
    });

    return this.firstFormGroup;
  }

  storeOrUpdate() {
    let requestStart = this.ldapService.store(this.firstFormGroup.value);

    if (this.ldapItem != null) {
      const data = this.firstFormGroup.value;
      data.id = this.ldapItem.id;
      requestStart = this.ldapService.update(data);
    }

    requestStart.pipe(
        tap((apiResponse) => {
          this.notificationService.show(apiResponse);
          this.dialogRef.close(true);
        }),
        catchError((err) => {
          this.formValidation.validateAllFields(this.firstFormGroup, err);
          return throwError(() => err);
        }),
        takeUntil(this.subject),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.subject.next(true);
    this.subject.complete();
  }

  testConnection() {
    this.ldapService.testConnection(this.ldapItem.id, this.testValue).pipe(
        tap((apiResponse) => {
          this.notificationService.show(apiResponse);
        }),
        catchError((err) => {
          this.notificationService.error(err.message);
          return throwError(() => err);
        }),
        takeUntil(this.subject),
    ).subscribe();
  }

  testNameChanged() {
    this.testValue = this.testName.nativeElement.value;
  }
}
