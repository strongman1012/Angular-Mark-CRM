import {Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, map, Subject, takeUntil, tap, throwError} from 'rxjs';
import {LazyLoadEvent} from 'primeng/api';

import {LdapService} from '../ldap.service';
import {NotificationService} from '../../../../shared/notification.service';
import {
  FuseConfirmationService,
} from '../../../../../@fuse/services/confirmation';
import {AddLdapComponent} from '../add-ldap/add-ldap.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'ldap-configuration',
  templateUrl: './ldap-configuration.component.html',
  styleUrls: ['./ldap-configuration.component.scss'],
})
export class LdapConfigurationComponent implements OnInit, OnDestroy {
  private lastTableLazyLoadEvent: LazyLoadEvent;

  loading: boolean = false;
  isDataLoading: boolean = false;
  totalRecords: number;
  private subject = new Subject<boolean>();

  data: any[] = [];
  cols = [
    {field: 'name', type: 'text', header: 'LDAP Name'},
    {field: 'hostname', type: 'text', header: 'Host Name'},
    {field: 'port', type: 'text', header: 'Port'},
    {field: 'ssl', type: 'text', header: 'SSL'},
    {field: 'authenticationType', type: 'text', header: 'Auth Type'},
    {field: 'username', type: 'text', header: 'Username'},
    {field: 'active', type: 'boolean', header: 'Active'},
    {field: 'priority', type: 'text', header: 'Priority'},
  ];

  selectedRow: any;

  constructor(
      private ldapService: LdapService,
      private matDialog: MatDialog,
      private notificationService: NotificationService,
      private confirmationService: FuseConfirmationService,
  ) {
  }

  ngOnInit(): void {
  }

  public refresh() {
    this.loadData(this.lastTableLazyLoadEvent);
  }

  public loadData($event) {

    this.lastTableLazyLoadEvent = $event;
    setTimeout(() => {
      this.ldapService.configurations({lazyEvent: JSON.stringify($event)}).pipe(
          map((apiResponse) => {
            this.data = apiResponse.data.rows;
            this.totalRecords = apiResponse.data.records;
            this.loading = false;
            this.isDataLoading = false;

          }),
          takeUntil(this.subject),
      ).subscribe();
    }, 10);
  }

  ngOnDestroy(): void {
    this.subject.next(true);
    this.subject.complete();

  }

  deleteLdap() {
    if (!this.selectedRow) {
      this.notificationService.error('Please select a row');
      return;
    }
    this.confirmationService.open().afterClosed().subscribe((result) => {
      if (result !== 'confirmed') {
        return;
      }
      this.ldapService.deleteConfiguration(this.selectedRow.id).pipe(
          tap((apiResponse) => {
            this.notificationService.show(apiResponse);
            this.loadData(this.lastTableLazyLoadEvent);
          }),
          catchError((err) => {
            this.notificationService.show(err.data.message);
            return throwError(() => err);
          }),
          takeUntil(this.subject),
      ).subscribe();
    });
  }

  public editLDAP() {
    if (!this.selectedRow) {
      this.notificationService.error('Please select a row');
      return;
    }
    this.openAddOrEditDialog();
  }

  private openAddOrEditDialog() {
    const dialogRef = this.matDialog.open(AddLdapComponent,
        {
          width: '60%',
          data: {ldapItem: this.selectedRow},
        });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result !== '') {
        this.refresh();
      }
    });
  }

}
