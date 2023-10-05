import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
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
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'edit-ldap-title',
  templateUrl: './edit-ldap-title.component.html',
})
export class EditLdapTitleComponent implements OnInit , OnDestroy {
  private subject = new Subject<boolean>();
  form$: Observable<FormGroup>;
  form: any;
  roles: any;
  targetRoles: any[] = [];

  constructor(
      @Inject(MAT_DIALOG_DATA) public dialogData: any,
      private apiService: RoleService,
      private passwordService: PasswordService,
      private formBuilder: FormBuilder,
      private formValidation: FormValidationService,
      private notificationService: NotificationService,
      private dialogRef: MatDialogRef<EditLdapTitleComponent>,
  ) {
  }

  ngOnInit(): void {
    this.initFormFields(this.dialogData.title);
  }

  private initFormFields(title: any) {
    this.form$ = this.apiService.initEditLdapTitleForm(title).pipe(
        map((apiResponse) => {
          this.roles = apiResponse.data.roles;
          return this.createForm(apiResponse.data.roleLdapTitle);
        }),
    );

  }

  private createForm(data): FormGroup {
    this.form = this.formBuilder.group({
      oldTitle: [data.ldapTitle],
      ldapTitle: [data.ldapTitle, [Validators.required]],
      roles: [data.roles.map(item => item.id)],
    });

    return this.form;
  }

  update() {

    this.apiService.updateLdapTitle(this.form.value).pipe(
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

