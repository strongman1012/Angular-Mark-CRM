import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {AdminUserService} from '../admin-user.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordService} from '../../../../shared/password.service';
import {catchError, Subject, takeUntil, tap, throwError} from 'rxjs';
import {NotificationService} from '../../../../shared/notification.service';
import {
  FormValidationService,
} from '../../../../shared/form-validation.service';
import {AdminUser} from '../../../../backend-api/models/admin.user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddUserComponent implements OnInit, OnDestroy {

  private subject = new Subject<boolean>();
  public form: FormGroup;
  public user: AdminUser;

  constructor(
      @Inject(MAT_DIALOG_DATA) public dialogData: any,
      private userService: AdminUserService,
      private passwordService: PasswordService,
      private formBuilder: FormBuilder,
      private formValidation: FormValidationService,
      private notificationService: NotificationService,
      private dialogRef: MatDialogRef<AddUserComponent>) {
  }

  ngOnInit(): void {
    this.user = this.dialogData.user;
    if (this.user) {
      this.updateForm();
    } else {
      this.createForm();
    }

  }

  private createForm() {
    this.form = this.formBuilder.group(
        {
          username: ['', [Validators.required, Validators.minLength(4)]],
          firstName: [
            '', [
              Validators.required, Validators.minLength(2),
              Validators.pattern('[a-zA-Z]*')]],
          lastName: [
            '', [
              Validators.required, Validators.minLength(2),
              Validators.pattern('[a-zA-Z]*')]],
          email: ['', [Validators.required, Validators.email]],
          password: [
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
              this.passwordService.matchValues('password')]],
          enabled: [true, Validators.required],
          initial: [true],
        },
    );
  }

  private updateForm() {
    this.form = this.formBuilder.group(
        {
          id: [this.user.id],
          username: [
            this.user.username,
            [Validators.required, Validators.minLength(4)]],
          firstName: [
            this.user.firstName, [
              Validators.required, Validators.minLength(2),
              Validators.pattern('[a-zA-Z]*')]],
          lastName: [
            this.user.lastName, [
              Validators.required, Validators.minLength(2),
              Validators.pattern('[a-zA-Z]*')]],
          email: [this.user.email, [Validators.required, Validators.email]],
          enabled: [this.user.enabled, Validators.required],
          initial: [true],
        },
    );
  }

  createUser() {
    this.userService.save(this.form.value).pipe(
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

  updateUser() {
    this.userService.update(this.user.id, this.form.value).pipe(
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
