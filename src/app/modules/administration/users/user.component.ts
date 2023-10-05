import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {catchError, Subject, takeUntil, tap, throwError} from 'rxjs';
import {AdminUserService} from './admin-user.service';
import {ConfirmationService, MenuItem} from 'primeng/api';
import {MatDialog} from '@angular/material/dialog';
import {AddUserComponent} from './add-user/add-user.component';
import {NotificationService} from '../../../shared/notification.service';
import {
  PasswordResetComponent,
} from './password-reset/password-reset.component';
import {
  UserReportingUnitComponent,
} from './user-reporting-unit/user-reporting-unit.component';
import {UserRoleComponent} from './user-role/user-role.component';

@Component({
  selector: 'admin-user',
  templateUrl: './user.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class UserComponent implements OnInit, OnDestroy {

  users: any[];
  menuItems: MenuItem[];
  totalRecords: number;

  cols = [
    {field: 'id', type: 'number', header: 'Id'},
    {field: 'username', type: 'text', header: 'Username'},
    {field: 'firstName', type: 'text', header: 'First Name'},
    {field: 'lastName', type: 'text', header: 'Last Name'},
    {field: 'email', type: 'text', header: 'Email'},
    {field: 'enabled', type: 'boolean', header: 'Enabled'},

  ];

  loading: boolean;
  private subject = new Subject<boolean>();
  filterColumns = this.cols.filter(p => p.field !== 'enabled').
      map<string>(q => q.field);
  selectedUser: any;
  selectedColumns = this.cols;

  constructor(
      private userService: AdminUserService,
      private userDialog: MatDialog,
      private notificationService: NotificationService,
      private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.initMenus();
    this.loadCars();
  }

  private initMenus() {
    this.menuItems = [
      {label: 'Add', icon: 'pi pi-user-plus', command: () => this.addUser()},
      {
        label: 'Edit',
        icon: 'pi pi-user-edit',
        command: () => this.updateUser(),
      },
      {label: 'Copy', icon: 'pi pi-copy', command: () => this.copyUser()},
      {
        label: 'Reporting Units',
        icon: 'pi pi-chart-bar',
        command: () => this.reportingUnits(),
      },
      {label: 'Roles', icon: 'pi pi-shield', command: () => this.roles()},
      {
        label: 'Password',
        icon: 'pi pi-lock',
        command: () => this.updatePassword(),
      },
      {label: 'Delete', icon: 'pi pi-trash', command: () => this.deleteUser()},
    ];
  }

  public loadCars() {
    this.loading = true;
    setTimeout(() => {
      this.userService.list().pipe(
          tap((apiResponse) => {
            this.users = apiResponse.data.rows;
            this.totalRecords = apiResponse.data.records;
            this.loading = false;
          }),
          takeUntil(this.subject),
      ).subscribe();
    }, 10);
  }

  ngOnDestroy(): void {
    this.subject.next(true);
    this.subject.complete();
  }

  private addUser() {
    this.selectedUser = null;
    this.addOrUpdateUser();
  }

  private updateUser() {
    this.checkUserSelected();
    this.addOrUpdateUser();
  }

  private checkUserSelected() {
    if (!this.selectedUser) {
      this.notificationService.error('Please select a user for editing');
      throw Error('Please select a user for editing');
    }
  }

  private addOrUpdateUser() {

    const dialogRef = this.userDialog.open(AddUserComponent,
        {data: {user: this.selectedUser}});

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.loadCars();
        this.selectedUser = null;
      }
    });
  }

  private updatePassword() {
    this.checkUserSelected();
    this.userDialog.open(PasswordResetComponent,
        {data: {user: this.selectedUser}});
  }

  private copyUser() {

  }

  private reportingUnits() {
    this.checkUserSelected();
    this.userDialog.open(UserReportingUnitComponent,
        {data: {user: this.selectedUser}});

  }

  private roles() {
    this.checkUserSelected();
    this.userDialog.open(UserRoleComponent, {data: {user: this.selectedUser}});
  }

  private deleteUser() {
    this.checkUserSelected();
    this.confirmationService.confirm({
      message: 'Do you want to remove selected users?',
      accept: () => {
        this.userService.delete(this.selectedUser.id).pipe(
            tap((apiResponse) => {
              this.notificationService.show(apiResponse);
              this.loadCars();
            }),
            catchError((err) => {
              this.notificationService.show(err.data.message);
              return throwError(() => err);
            }),
            takeUntil(this.subject),
        ).subscribe();
      },
    });

  }

}
