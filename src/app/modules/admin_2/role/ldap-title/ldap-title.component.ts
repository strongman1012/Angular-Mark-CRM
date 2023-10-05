import {Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, map, Subject, takeUntil, tap, throwError} from 'rxjs';
import {ConfirmationService, LazyLoadEvent} from 'primeng/api';
import {RoleService} from '../role.service';
import {Router} from '@angular/router';
import {AddRoleComponent} from '../add-role/add-role.component';
import {MatDialog} from '@angular/material/dialog';
import {AddLdapTitleComponent} from './add-ldap-title/add-ldap-title.component';
import {EditRoleComponent} from '../edit-role/edit-role.component';
import {NotificationService} from '../../../../shared/notification.service';
import {
  EditLdapTitleComponent,
} from './edit-ldap-title/edit-ldap-title.component';

@Component({
  selector: 'app-ldap-title',
  templateUrl: './ldap-title.component.html',
})
export class LdapTitleComponent implements OnInit, OnDestroy {
  rows: any;
  selectedRow: any;

  totalRecords: any;
  loading: any;
  cols = [
    {
      field: 'ldapTitle', type: 'text', header: 'Title',
      iconClass: 'pi-angle-right',
    },
    {
      field: 'roleCount', type: 'text', header: 'Role Count',
      iconClass: 'pi-angle-right',
    },

  ];
  menuItems = [

    {label: 'Add', icon: 'pi pi-user-plus', command: () => this.add()},
    {
      label: 'Edit',
      icon: 'pi pi-user-edit',
      command: () => this.edit(),
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => this.delete(),
    },
    {
      label: 'Back',
      icon: 'pi pi-arrow-circle-left',
      command: () => this.backPage(),
    },
  ];
  private subject = new Subject<boolean>();

  constructor(private apiService: RoleService, private router: Router,
              private matDialog: MatDialog,
              private confirmationService: ConfirmationService,
              private notificationService: NotificationService) {
  }

  ngOnDestroy(): void {
    this.subject.next(true);
    this.subject.complete();
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loading = true;

    setTimeout(() => {
      this.apiService.ldapTitles().pipe(
          map((apiResponse) => {
            this.rows = apiResponse.data.rows;
            this.totalRecords = apiResponse.data.records;
            this.loading = false;
          }),
          takeUntil(this.subject),
      ).subscribe();

    }, 10);
  }

  private add() {
    const dialogRef = this.matDialog.open(AddLdapTitleComponent, {
      width: '40%',
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
        this.apiService.deleteLdapTitle(this.selectedRow.ldapTitle).pipe(
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

  edit() {
    this.checkRowSelected();
    const dialogRef = this.matDialog.open(EditLdapTitleComponent,
        {
          width: '40%',

          data: {title: this.selectedRow ? this.selectedRow.ldapTitle : null},
        });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.loadData();
      }
    });
  }

  private checkRowSelected() {
    if (!this.selectedRow) {
      this.notificationService.error('Please select a row');
      throw Error('Please select a row');
    }
  }

  private backPage() {
    return this.router.navigateByUrl('/admin/roles');
  }
}
