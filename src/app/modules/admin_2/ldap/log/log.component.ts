import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, Subject, takeUntil} from 'rxjs';
import {LazyLoadEvent} from 'primeng/api';
import {
  SapSystemService,
} from '../../reporting-units/sapsystem/sap-system.service';
import {LdapService} from '../ldap.service';

@Component({
  selector: 'ldap-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
})
export class LogComponent implements OnInit, OnDestroy {
  private lastTableLazyLoadEvent: LazyLoadEvent;
  loading: boolean;
  totalRecords: number;
  private subject = new Subject<boolean>();
  data: any[] = [];
  cols = [
    {field: 'configName', type: 'text', header: 'LDAP Name'},
    {field: 'createdDate', type: 'longDate', header: 'Date'},
    {field: 'logStatus', type: 'text', header: 'Status'},
  ];
  selectedRow: any;
  logDetail: any;

  constructor(private ldapService: LdapService) {
  }

  ngOnInit(): void {
  }

  public loadData($event) {
    this.lastTableLazyLoadEvent = $event;
    setTimeout(() => {
      this.ldapService.logs({lazyEvent: JSON.stringify($event)}).pipe(
          map((apiResponse) => {
            this.data = apiResponse.data.rows;
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

  loadLogDetail() {
    this.ldapService.logDetail(this.selectedRow.id).pipe(
        map((apiResponse) => {
          this.logDetail = apiResponse.data.rawLog;

        }),
        takeUntil(this.subject),
    ).subscribe();
  }
}
