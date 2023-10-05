import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { AdminUserService } from '../../users/admin-user.service';

@Component({
  selector: 'logs',
  template: `
    <app-table [cols]=cols [data]=data [loading]=loading [totalRecords]=totalRecords [startingDisplayAmout]=startingDisplayAmout></app-table> 
    `,
  styles: [`  
        :host {
            width: 100%;
        }
    `],
})
export class AuditLogs implements OnInit, OnDestroy {
  cols = [
    { field: 'propertyName', type: 'text', header: 'Property' },
    { field: 'valueBefore', type: 'text', header: 'Before' },
    { field: 'valueAfter', type: 'text', header: 'After' },
    { field: 'updateTime', type: 'text', header: 'Time' },
    { field: 'updatedBy', type: 'text', header: 'Updated By' },
    { field: 'changeType', type: 'text', header: 'Type' },
  ];
  data = [
  ]
  totalRecords: number;
  loading: boolean;
  private subject = new Subject<boolean>();
  filterColumns = this.cols.filter(p => p.field !== 'enabled').map<string>(q => q.field);
  selectedUser: any;
  logDescription: string;
  activeItem: boolean;
  // i = 0;
  startingDisplayAmout: number = 10;

  constructor(private userService: AdminUserService
  ) {

  }

  ngOnInit(): void {
    this.loadData();
    this.logDescription = '';
    console.log("loaded component")
  }

  public loadData() {
    this.loading = true;
    this.data = [
      {
        "id": 3,
        "propertyId": 25,
        "propertyName": "restservice.reporting_unit",
        "valueBefore": "development",
        "valueAfter": "DatAero",
        "action": "UPDATE",
        "updateTime": "1653802875000",
        "updatedBy": "jaychandra",
        "changeType": 0
      },
      {
        "id": 4,
        "propertyId": 25,
        "propertyName": "restservice.reporting_unit",
        "valueBefore": "",
        "valueAfter": "",
        "action": "UPDATE",
        "updateTime": "1653802875000",
        "updatedBy": "jaychandra",
        "changeType": 1
      },
      {
        "id": 1,
        "propertyId": 1,
        "propertyName": "storage.max_file_size_mb",
        "valueBefore": "11",
        "valueAfter": "15",
        "action": "UPDATE",
        "updateTime": "1631362638000",
        "updatedBy": "jaychandra",
        "changeType": 0
      },
      {
        "id": 2,
        "propertyId": 1,
        "propertyName": "storage.max_file_size_mb",
        "valueBefore": "",
        "valueAfter": "",
        "action": "UPDATE",
        "updateTime": "1631362638000",
        "updatedBy": "jaychandra",
        "changeType": 1
      }
    ];
    this.data.forEach(
      e => e.changeType = e.changeType == 0? 'Value': 'Description'
    );
    this.loading = false;
    // setTimeout(() => {
    //     this.userService.getEventViewerLoglist().pipe(
    //         tap((apiResponse) => {
    //             console.log(apiResponse);
    //             this.data = apiResponse.data.rows;

    //             this.totalRecords = apiResponse.data.records;
    //             this.loading = false;
    //         }),
    //         takeUntil(this.subject)
    //     ).subscribe();
    // }, 10);
  }

  ngAfterViewInit(): void {

  }

  ngOnDestroy(): void {
  }
}
