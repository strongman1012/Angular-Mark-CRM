import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AdminUserService} from '../admin-user.service';
import {PasswordService} from '../../../../shared/password.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {
  FormValidationService,
} from '../../../../shared/form-validation.service';
import {NotificationService} from '../../../../shared/notification.service';
import {Subject, takeUntil, tap} from 'rxjs';

@Component({
  selector: 'user-role',
  templateUrl: './user-role.component.html',
  styleUrls: ['./user-role.component.scss'],
})
export class UserRoleComponent implements OnInit, OnDestroy {
  private subject = new Subject<boolean>();
  public form: FormGroup;
  public user: any;
  userRoles: any[];
  selectedUserRoles: any[] = [];
  loading: boolean;

  constructor(
      @Inject(MAT_DIALOG_DATA) public dialogData: any,
      private userService: AdminUserService,
      private passwordService: PasswordService,
      private formBuilder: FormBuilder,
      private formValidation: FormValidationService,
      private notificationService: NotificationService,
      private dialogRef: MatDialogRef<UserRoleComponent>,
  ) {
  }

  ngOnInit(): void {
    this.user = this.dialogData.user;

    if (this.user) {
      this.initUserRoles();
    }
  }

  private initUserRoles() {

    setTimeout(() => {
      this.userService.userRoles(this.user.id).pipe(
          tap((apiResponse) => {
            this.userRoles = apiResponse.data.userRoles.filter(p =>
                !apiResponse.data.userVO.roleIds.includes(p.id));
            this.selectedUserRoles = apiResponse.data.userRoles.filter(p =>
                apiResponse.data.userVO.roleIds.includes(p.id));

          }),
          takeUntil(this.subject),
      ).subscribe();
    }, 10);
  }

  ngOnDestroy(): void {
    this.subject.next(true);
    this.subject.complete();
  }

  saveUserRoles() {
    const data = {
      id: this.user.id,
      username: this.user.username,
      roleIds: this.selectedUserRoles.map(item => item.id),
    };
    this.userService.saveUserRoles(data).pipe(
        tap((apiResponse) => {
          this.notificationService.show(apiResponse);
        }),
        takeUntil(this.subject),
    ).subscribe();
  }
}
