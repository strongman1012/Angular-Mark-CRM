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

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {RoleService} from '../role.service';
import {
  FormValidationService,
} from '../../../../shared/form-validation.service';
import {NotificationService} from '../../../../shared/notification.service';

@Component({
  selector: 'edit-role-operations',
  templateUrl: './edit-role-operation.component.html',
})
export class EditRoleOperationComponent implements OnInit, OnDestroy {
  private subject = new Subject<boolean>();
  form$: Observable<FormGroup>;
  form: any;
  operations: any[] = [];
  targetOperations: any[] = [];

  constructor(
      @Inject(MAT_DIALOG_DATA) public dialogData: any,
      private apiService: RoleService,
      private formBuilder: FormBuilder,
      private formValidation: FormValidationService,
      private notificationService: NotificationService,
      private dialogRef: MatDialogRef<EditRoleOperationComponent>,
  ) {
  }

  ngOnInit(): void {
    this.initFormFields(this.dialogData.role);
  }

  private initFormFields(role: any) {
    this.form$ = this.apiService.initEditRoleOperationForm(role.id).pipe(
        map((apiResponse) => {
          this.operations = apiResponse.data.operations.filter(
              p => !apiResponse.data.role.operationIds.includes(p.id));
          this.targetOperations = apiResponse.data.operations.filter(
              p => apiResponse.data.role.operationIds.includes(p.id));
          return this.createForm(role, apiResponse.data);
        }),
    );

  }

  private createForm(role, data): FormGroup {
    this.form = this.formBuilder.group({
      id: [role.id],
      roleName: [{value: role.roleName, disabled: true}],
      operationIds: [data.role.operationIds],
    });

    return this.form;
  }

  update() {
    const data = {
      id: this.form.value['id'],
      operationIds: this.targetOperations.map(p => p.id),
    };

    this.apiService.updateRoleOperations(data).pipe(
        tap((apiResponse) => {
          this.notificationService.show(apiResponse);
          this.dialogRef.close(false);
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

