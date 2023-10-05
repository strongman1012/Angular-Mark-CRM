import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  catchError,
  map,
  Observable,
  Subject,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordService} from '../../../../../shared/password.service';
import {
  FormValidationService,
} from '../../../../../shared/form-validation.service';
import {RoleService} from '../../role.service';
import {NotificationService} from '../../../../../shared/notification.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-ldap-title',
  templateUrl: './add-ldap-title.component.html',
})
export class AddLdapTitleComponent implements OnInit , OnDestroy {
  private subject = new Subject<boolean>();
  form$: Observable<FormGroup>;
  form: any;
  roles: any;
  targetRoles: any[] = [];

  constructor(
      //@Inject(MAT_DIALOG_DATA) public dialogData: any,
      private apiService: RoleService,
      private passwordService: PasswordService,
      private formBuilder: FormBuilder,
      private formValidation: FormValidationService,
      private notificationService: NotificationService,
     private dialogRef: MatDialogRef<AddLdapTitleComponent>,
  ) {
  }

  ngOnInit(): void {
    this.initFormFields();
  }

  private initFormFields() {
    this.form$ = this.apiService.initNewLdapTitleForm().pipe(
        map((apiResponse) => {
          this.roles = apiResponse.data;
          return this.createForm();
        }),
    );

  }

  private createForm(): FormGroup {
    this.form = this.formBuilder.group({
      ldapTitle: ['', [Validators.required]],
      roles: [''],
    });

    return this.form;
  }

  store() {
    this.form.value['roles'] = this.targetRoles.map(
        item => item.id);
    this.apiService.storeLdapTitle(this.form.value).pipe(
        tap((apiResponse) => {
          this.notificationService.show(apiResponse);
          this.dialogRef.close(true);
        }),
        catchError((err) => {
          this.formValidation.validateAllFields(this.form,
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

