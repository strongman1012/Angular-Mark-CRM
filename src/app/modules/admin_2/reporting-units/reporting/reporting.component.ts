import {Component, OnDestroy, OnInit} from '@angular/core';
import {catchError, map, Subject, takeUntil, tap, throwError} from 'rxjs';
import {ConfirmationService, LazyLoadEvent} from 'primeng/api';
import {NotificationService} from '../../../../shared/notification.service';
import {SapSystemService} from '../sapsystem/sap-system.service';
import {MatDialog} from '@angular/material/dialog';
import {
  AddSapSystemComponent,
} from '../sapsystem/add-sapsystem/add-sap-system.component';
import {ReportingService} from './reporting.service';
import {
  ReportingDetailComponent,
} from './reporting-detail/reporting-detail.component';
import {ApiResponse} from '../../../../backend-api/models/api-response';
import {AddReportingComponent} from './add-reporting/add-reporting.component';
import {
  EditReportingComponent,
} from './edit-reporting/edit-reporting.component';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss'],
})
export class ReportingComponent implements OnInit, OnDestroy {
  loading: boolean;
  reportingUnits: any[] = [];
  totalRecords: number;
  menuItems = [
    {label: 'Add', icon: 'pi pi-user-plus', command: () => this.addSapSystem()},
    {
      label: 'Edit',
      icon: 'pi pi-user-edit',
      command: () => this.editSapSystem(),
    },
    {
      label: 'Delete',
      icon: 'pi pi-trash',
      command: () => this.deleteReporting(),
    },

  ];
  private subject = new Subject<boolean>();
  private subjectDashboard = new Subject<boolean>();
  private lastTableLazyLoadEvent: LazyLoadEvent;
  cols = [

    {
      field: 'name', type: 'text', header: 'Name',
      width: 200,
      color: '#008cf0',
      iconClass: 'pi-angle-right',
      onClick: data => this.openDetail(data),
    },
    {field: 'sapSystemsStr', type: 'text', header: 'Systems'},
    {field: 'dbConnection', type: 'text', subField: 'name', header: 'Database'},
    {
      field: 'dbConnection',
      type: 'text',
      subField: 'url',
      header: 'Database URL',
    },
    {field: 'notificationScope', type: 'boolean', header: 'Notification Scope'},

  ];
  selectedColumns = this.cols;

  filterColumns = this.cols.filter(p => p.type !== 'boolean').
      map<string>(q => q.field);
  selectedRow: any;

  dailyEvents: any;
  chartUsersPerRUMap: any;
  chartSystemsPerRUMap: any;
  chartActivePassiveUsers: any;
  chartOptions = {
    plugins: {
      tooltip: {
        enabled: true, // <-- this option disables tooltips
      },
      legend: {
        display: false,
      },
    },
  };
  dailyEventOptions = {
    plugins: {
      tooltip: {
        enabled: true, // <-- this option disables tooltips
      },
      legend: {
        display: false,
      },
    },
  };

  constructor(
      private notificationService: NotificationService,
      private apiService: ReportingService,
      private matDialog: MatDialog,
      private confirmationService: ConfirmationService) {
  }

  ngOnInit(): void {
    this.apiService.dashboard().pipe(
        map((apiResponse) => {
          this.generateLoginEventChart(apiResponse);
          this.generateNoOfUsersPerRuChart(apiResponse);
          this.generateNoOfSystemsPerRuChart(apiResponse);
          this.generateNoOfActivePassiveChart(apiResponse);
        }),
        takeUntil(this.subjectDashboard),
    ).subscribe();
  }

  public loadData($event) {
    this.lastTableLazyLoadEvent = $event;
    setTimeout(() => {
      this.apiService.list({lazyEvent: JSON.stringify($event)}).pipe(
          map((apiResponse) => {
            this.reportingUnits = apiResponse.data.rows;
            this.totalRecords = apiResponse.data.records;
            this.loading = false;
          }),
          takeUntil(this.subject),
      ).subscribe();

    }, 10);
  }

  private generateLoginEventChart(apiResponse: ApiResponse) {
    const loginEventsMap = Array.from(
        Object.entries(apiResponse.data.loginEventsMap)).
        filter(([key, value]) => value > 0);
    const backgroundColors = [];
    // eslint-disable-next-line no-bitwise
    loginEventsMap.forEach(() => backgroundColors.push(
        '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')));
    this.dailyEvents = {
      labels: loginEventsMap.map(item => item[0]),
      datasets: [
        {
          label: 'Event',
          data: loginEventsMap.map(item => item[1]),
          backgroundColor: backgroundColors,
        },

      ],
    };
  }

  private generateNoOfUsersPerRuChart(apiResponse: ApiResponse) {
    const usersPerRUMap = Array.from(
        Object.entries(apiResponse.data.usersPerRUMap)).
        filter(([key, value]) => value > 0);
    const backgroundColors = [];

    // eslint-disable-next-line no-bitwise
    usersPerRUMap.forEach(() => backgroundColors.push(
        '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')));
    this.chartUsersPerRUMap = {
      labels: usersPerRUMap.map(item => item[0]),
      datasets: [
        {
          data: usersPerRUMap.map(item => item[1]),
          backgroundColor: backgroundColors,
        },

      ],
    };
  }

  private generateNoOfSystemsPerRuChart(apiResponse: ApiResponse) {
    const systemsPerRUMap = Array.from(
        Object.entries(apiResponse.data.systemsPerRUMap)).
        filter(([key, value]) => value > 0);
    const backgroundColors = [];

    // eslint-disable-next-line no-bitwise
    systemsPerRUMap.forEach(() => backgroundColors.push(
        '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')));
    this.chartSystemsPerRUMap = {
      labels: systemsPerRUMap.map(item => item[0]),
      datasets: [
        {
          data: systemsPerRUMap.map(item => item[1]),
          backgroundColor: backgroundColors,
        },

      ],
    };
  }

  private generateNoOfActivePassiveChart(apiResponse: ApiResponse) {
    const usersMap = Array.from(Object.entries(apiResponse.data.usersMap)).
        filter(([key, value]) => value > 0);
    const backgroundColors = [];

    // eslint-disable-next-line no-bitwise
    usersMap.forEach(() => backgroundColors.push(
        '#' + (Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')));
    this.chartActivePassiveUsers = {
      labels: usersMap.map(item => item[0]),
      datasets: [
        {
          data: usersMap.map(item => item[1]),
          backgroundColor: backgroundColors,
        },

      ],
    };
  }

  private openDetail(data) {
    this.matDialog.open(ReportingDetailComponent,
        {
          width: '60%',
          data: {reportingUnit: data},
        });
  }

  private addSapSystem() {
    this.selectedRow = null;
    this.showAddReportingUnitComponent();
  }

  private showAddReportingUnitComponent() {
    const dialogRef = this.matDialog.open(AddReportingComponent,
        {
          width: '40%',
        });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.loadData(this.lastTableLazyLoadEvent);
      this.selectedRow = null;
    });
  }

  private editSapSystem() {
    this.checkSelected();
    const dialogRef = this.matDialog.open(EditReportingComponent,
        {
          width: '40%',
          data: {reportingId: this.selectedRow ? this.selectedRow.id : null},
        });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.loadData(this.lastTableLazyLoadEvent);
      this.selectedRow = null;
    });
  }

  private checkSelected() {
    if (!this.selectedRow) {
      this.notificationService.error('Please select a system');
      throw Error('Please select a system');
    }
  }

  private deleteReporting() {
    this.checkSelected();
    this.confirmationService.confirm({
      message: 'Do you want to remove selected reporting unit?',
      accept: () => {
        this.apiService.delete(this.selectedRow.id).pipe(
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
      },
    });

  }

  ngOnDestroy(): void {
    this.subject.next(true);
    this.subject.complete();
    this.subjectDashboard.next(true);
    this.subjectDashboard.complete();
  }
}
