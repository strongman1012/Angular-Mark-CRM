import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfirmationService, LazyLoadEvent} from 'primeng/api';
import {catchError, map, Subject, takeUntil, tap, throwError} from 'rxjs';
import {NotificationService} from '../../../shared/notification.service';
import {MatDialog} from '@angular/material/dialog';
import {RoleService} from './role.service';
import {AddRoleComponent} from './add-role/add-role.component';

import {EditRoleComponent} from './edit-role/edit-role.component';

import {Router} from '@angular/router';
import {
  EditRoleOperationComponent
} from './edit-role-operation/edit-role-operation.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit, OnDestroy {
  roles: any;
  selectedRow: any;

  totalRecords: any;
  loading: any;
  cols = [
    {
      field: 'roleName', type: 'text', header: 'Name',
      iconClass: 'pi-angle-right',
    },
    {
      field: 'roleDescription', type: 'text', header: 'Description',

      iconClass: 'pi-angle-right',
    },

  ];
  menuItems = [
    {
      label: 'LDAP Titles',
      icon: 'pi pi-user-plus',
      command: () => this.goToLdapTitles(),
    },
    {label: 'Add', icon: 'pi pi-user-plus', command: () => this.add()},
    {
      label: 'Edit',
      icon: 'pi pi-user-edit',
      command: () => this.edit(),
    },
    {
      label: 'Edit Operations',
      icon: 'pi pi-user-edit',
      command: () => this.editOperations(),
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => this.delete(),
    },

  ];
  private subject = new Subject<boolean>();
  private subjectDashboard = new Subject<boolean>();
  private lastTableLazyLoadEvent: LazyLoadEvent;

  constructor(
      private notificationService: NotificationService,
      private apiService: RoleService,
      private matDialog: MatDialog,
      private confirmationService: ConfirmationService,
      private router: Router) {
  }

  ngOnDestroy(): void {
    this.subject.next(true);
    this.subject.complete();
  }

  ngOnInit(): void {
    this.loadData();
  }

  add() {
    const dialogRef = this.matDialog.open(AddRoleComponent, {
      width: '40%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.loadData();
      }
    });
  }

  edit() {
    this.checkRowSelected();
    const dialogRef = this.matDialog.open(EditRoleComponent,
        {
          width: '40%',
          data: {roleId: this.selectedRow ? this.selectedRow.id : null},
        });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.loadData();
      }
    });
  }

  editOperations() {
    this.checkRowSelected();
    const dialogRef = this.matDialog.open(EditRoleOperationComponent,
        {
          width: '40%',

          data: {role: this.selectedRow ? this.selectedRow : null},
        });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.loadData();
      }
    });
  }

  delete() {
    this.checkRowSelected();
    this.confirmationService.confirm({
      message: 'Do you want to remove selected users?',
      accept: () => {
        this.apiService.delete(this.selectedRow.id).pipe(
            tap((apiResponse) => {
              this.notificationService.show(apiResponse);
              this.loadData();
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

  private checkRowSelected() {
    if (!this.selectedRow) {
      this.notificationService.error('Please select a row');
      throw Error('Please select a row');
    }
  }

  loadData() {
    this.loading = true;

    setTimeout(() => {
      this.apiService.list().pipe(
          map((apiResponse) => {
            this.roles = apiResponse.data.rows;
            this.totalRecords = apiResponse.data.records;
            this.loading = false;
          }),
          takeUntil(this.subject),
      ).subscribe();

    }, 10);
  }

  private goToLdapTitles() {
    this.router.navigateByUrl('/admin/roles/ldap-titles');
  }
}
