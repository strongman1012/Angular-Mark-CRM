import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordService} from '../../../../shared/password.service';
import {
  catchError, map,
  Observable,
  Subject,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';
import {NotificationService} from '../../../../shared/notification.service';
import {
  FormValidationService,
} from '../../../../shared/form-validation.service';
import {AdminUser} from '../../../../backend-api/models/admin.user';
import {RoleService} from '../role.service';

@Component({
  selector: 'app-add-user',
  templateUrl: '../edit-role/edit-role.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditRoleComponent implements OnInit, OnDestroy {

  private subject = new Subject<boolean>();
  public form: FormGroup;
  public user: AdminUser;
  form$: Observable<FormGroup>;

  constructor(
      @Inject(MAT_DIALOG_DATA) public dialogData: any,
      private apiService: RoleService,
      private passwordService: PasswordService,
      private formBuilder: FormBuilder,
      private formValidation: FormValidationService,
      private notificationService: NotificationService,
      private dialogRef: MatDialogRef<EditRoleComponent>) {
  }

  ngOnInit(): void {
    this.initFormFields(this.dialogData.roleId);
  }

  private initFormFields(roleId: any) {
    this.form$ = this.apiService.initDataForEdit(roleId).pipe(
        map((apiResponse) => {

          this.form = this.formBuilder.group({
            id: [apiResponse.data.id],
            roleName: [
              {value: apiResponse.data.roleName, disabled: true},
              [Validators.required, Validators.minLength(4)]],
            roleDescription: [
              apiResponse.data.roleDescription, [
                Validators.required, Validators.minLength(2)]],
          });
          return this.form;
        }),
    );

  }

  storeOrUpdate() {
    this.apiService.update(this.form.value).pipe(
        tap((apiResponse) => {
          this.notificationService.show(apiResponse);
          this.dialogRef.close(true);
        }),
        catchError((err) => {
          this.formValidation.validateAllFields(this.form, err);
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
