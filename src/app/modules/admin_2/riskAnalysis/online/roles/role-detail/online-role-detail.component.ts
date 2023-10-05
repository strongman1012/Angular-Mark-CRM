import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { map, Subject, takeUntil } from 'rxjs';
import { RiskAnalysisOnlineService } from '../../risk-analysis-online.service';

@Component({
  selector: 'online-role-detail',
  template: ``,
})
export class OnlineRoleDetailComponent implements OnInit, OnDestroy {
  private subject = new Subject<boolean>();
  private reportingUnit: any;

  items: any;
  users: any;
  authorizations: any;
  cols = [
    {name: 'name', type: 'text', header: 'Role'},
    {name: 'roleDesc.description', type: 'text', header: 'Description'},
    {name: 'fromDateStr', type: 'text', header: 'From Date [YYYY-MM-DD]'},
    {name: 'toDateStr', type: 'text', header: 'To Date [YYYY-MM-DD]'},
  ];
  primaryKey: 'name';
  role: any;
  authorizationColumns = [
    {name: 'profile', type: 'text', header: 'Profile'},
    {name: 'auth', type: 'text', header: 'Auth'},
    {name: 'object', type: 'text', header: 'Object'},
    {name: 'field', type: 'text', header: 'Field'},
    {name: 'von', type: 'text', header: 'Von'},
    {name: 'bis', type: 'text', header: 'Bis'},
  ];
  userColumns = [
    {name: 'bname', type: 'text', header: 'BName'},
    {name: 'firstName', type: 'text', header: 'First Name'},
    {name: 'lastName', type: 'text', header: 'Last Name'},
    {name: 'userText', type: 'text', header: 'User Text'},
  ];

  constructor(
      @Inject(MAT_DIALOG_DATA) public dialogData: any,
      private apiService: RiskAnalysisOnlineService,
      private dialogRef: MatDialogRef<OnlineRoleDetailComponent>,
  ) {
  }

  ngOnInit(): void {
    // this.reportingUnit = this.dialogData.reportingUnit;
    this.initDetail();
  }

  public initDetail() {
    const data = {roleId: this.dialogData.roleId, sapId: this.dialogData.sapId};

    this.apiService.roleDetail(data).pipe(
        map((apiResponse) => {
          if (apiResponse.success) {
            this.users = apiResponse.data.users;
            this.authorizations = apiResponse.data.authorizations;
            this.role = apiResponse.data.role;
          }
        }),
        takeUntil(this.subject),
    ).subscribe();

  }

  ngOnDestroy(): void {
    this.subject.next(true);
    this.subject.complete();
  }
}
