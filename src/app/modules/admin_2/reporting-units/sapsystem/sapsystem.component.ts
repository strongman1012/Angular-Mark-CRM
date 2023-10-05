import {Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, map, Subject, takeUntil, tap, throwError} from 'rxjs';
import {SapSystemService} from './sap-system.service';

import {MatDialog} from '@angular/material/dialog';
import {ConfirmationService, LazyLoadEvent} from 'primeng/api';
import {AddSapSystemComponent} from './add-sapsystem/add-sap-system.component';
import {NotificationService} from '../../../../shared/notification.service';

@Component({
  selector: 'app-sapsystem',
  templateUrl: './sapsystem.component.html',
  styleUrls: ['./sapsystem.component.scss'],
})
export class SapsystemComponent implements OnInit, OnDestroy {
  loading: boolean;
  sapSystems: any[] = [];
  totalRecords: number;
  menuItems = [
    {label: 'Add', icon: 'pi pi-user-plus', command: () => this.addSapSystem()},
    {
      label: 'Edit',
      icon: 'pi pi-user-edit',
      command: () => this.editSapSystem(),
    },
    {label: 'Test', icon: 'pi pi-test', command: () => this.testSapSystem()},
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => this.deleteSapSystem(),
    },

  ];
  private subject = new Subject<boolean>();
  private lastTableLazyLoadEvent: LazyLoadEvent;
  cols = [

    {field: 'destinationName', type: 'text', header: 'Connection'},
    {field: 'description', type: 'text', header: 'Description'},

    {field: 'offline', type: 'boolean', header: 'Offline'},
    {field: 'hostName', type: 'text', header: 'Hostname'},
    {field: 'userName', type: 'text', header: 'Username'},
    {field: 'clientNumber', type: 'text', header: 'Client'},
    {field: 'sysNr', type: 'text', header: 'Instance Nr'},
    {field: 'languageCode', type: 'text', header: 'Language'},
    {field: 'sid', type: 'text', header: 'SID'},
    {field: 'timeZone', type: 'text', subField: 'name', header: 'Timezone'},

  ];
  filterColumns = this.cols.filter(p => p.type !== 'boolean').
      map<string>(q => q.field);
  selectedSapSystem: any;
  selectedColumns = this.cols;

  constructor(
      private notificationService: NotificationService,
      private sapSystemService: SapSystemService,
      private matDialog: MatDialog,
      private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
  }

  public loadSapSystems($event) {
    this.lastTableLazyLoadEvent = $event;
    setTimeout(() => {
      this.sapSystemService.list({lazyEvent: JSON.stringify($event)}).pipe(
          map((apiResponse) => {
            this.sapSystems = apiResponse.data.rows;
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

  private addSapSystem() {
    this.selectedSapSystem = null;
    this.openAddOrEditSapSystemDialog();
  }

  private openAddOrEditSapSystemDialog() {
    const dialogRef = this.matDialog.open(AddSapSystemComponent,
        {
          width: '60%',

          data: {
            sapSystemId: this.selectedSapSystem ?
                this.selectedSapSystem.id :
                null,
          },
        });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      if (result) {
        this.loadSapSystems(this.lastTableLazyLoadEvent);
        this.selectedSapSystem = null;
      }
    });
  }

  private editSapSystem() {
    this.checkSelected();
    this.openAddOrEditSapSystemDialog();
  }

  private checkSelected() {
    if (!this.selectedSapSystem) {
      this.notificationService.error('Please select a system');
      throw Error('Please select a system');
    }
  }

  private testSapSystem() {
    this.checkSelected();
    this.checkIsOffline();
    this.sapSystemService.testSapSystem(this.selectedSapSystem.id).pipe(
        map((apiResponse) => {
          this.notificationService.show(apiResponse);
        }),
        takeUntil(this.subject),
    ).subscribe();

  }

  private checkIsOffline() {
    if (this.selectedSapSystem.offline) {
      this.notificationService.error('Please select online sap system');
      throw Error('Please select online sap system');
    }
  }

  private deleteSapSystem() {
    this.checkSelected();
    this.confirmationService.confirm({
      message: 'Do you want to remove selected sap system?',
      accept: () => {
        this.sapSystemService.delete(this.selectedSapSystem.id).pipe(
            tap((apiResponse) => {
              this.notificationService.show(apiResponse);
              this.loadSapSystems(this.lastTableLazyLoadEvent);
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
