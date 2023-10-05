import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {AdminUser} from '../../../../backend-api/models/admin.user';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from '../../../../shared/notification.service';
import {catchError, Subject, takeUntil, tap, throwError} from 'rxjs';
import {AdminUserService} from '../admin-user.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordService} from '../../../../shared/password.service';
import {
  FormValidationService,
} from '../../../../shared/form-validation.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
})
export class PasswordResetComponent implements OnInit, OnDestroy {
  public user: AdminUser;
  public form: FormGroup;
  private subject = new Subject<boolean>();

  constructor(
      @Inject(MAT_DIALOG_DATA) public dialogData: any,
      private notificationService: NotificationService,
      private dialogRef: MatDialogRef<PasswordResetComponent>,
      private formBuilder: FormBuilder,
      private userService: AdminUserService,
      private formValidation: FormValidationService,
      private passwordService: PasswordService) {
  }

  ngOnInit(): void {
    this.user = this.dialogData.user;
    this.createForm();
  }

  private createForm() {
    this.form = this.formBuilder.group(
        {
          id: [this.user.id, [Validators.required, Validators.minLength(4)]],
          username: new FormControl({value: this.user.username, disabled: true},
              Validators.required),
          newPassword: [
            '',
            [
              Validators.required,
              Validators.minLength(5),
              Validators.maxLength(20)]],
          confirmPassword: [
            '', [
              Validators.required,
              Validators.minLength(5),
              Validators.maxLength(20),
              this.passwordService.matchValues('newPassword')]],

        },
    );
  }

  updatePassword() {
    this.userService.updatePassword(this.form.getRawValue()).pipe(
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
