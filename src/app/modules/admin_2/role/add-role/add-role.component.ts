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
import {catchError, Subject, takeUntil, tap, throwError} from 'rxjs';
import {NotificationService} from '../../../../shared/notification.service';
import {
  FormValidationService,
} from '../../../../shared/form-validation.service';
import {AdminUser} from '../../../../backend-api/models/admin.user';
import {RoleService} from '../role.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-role.component.html',

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddRoleComponent implements OnInit, OnDestroy {

  private subject = new Subject<boolean>();
  public form: FormGroup;
  public user: AdminUser;

  constructor(
      @Inject(MAT_DIALOG_DATA) public dialogData: any,
      private apiService: RoleService,
      private passwordService: PasswordService,
      private formBuilder: FormBuilder,
      private formValidation: FormValidationService,
      private notificationService: NotificationService,
      private dialogRef: MatDialogRef<AddRoleComponent>) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.form = this.formBuilder.group(
        {
          roleName: ['', [Validators.required, Validators.minLength(4)]],
          roleDescription: [
            '', [
              Validators.required, Validators.minLength(2)]],
        },
    );
  }

  storeOrUpdate() {
    this.apiService.store(this.form.value).pipe(
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
