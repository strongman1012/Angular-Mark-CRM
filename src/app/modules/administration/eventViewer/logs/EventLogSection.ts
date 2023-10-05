import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Observable, of, Subject, Subscription, takeUntil, tap } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, ExtraOptions, PreloadAllModules, Router, RouterModule, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ColumnItems, TableComponent } from 'app/components/tables.component';
import { LogDetailsComponent } from 'app/components/log-details';
import { FormsModule } from '@angular/forms';
import { AdminUserService } from '../../users/admin-user.service';

@Component({
    selector: 'logs',
    template: `
    <app-table [cols]=cols [(logDescription)]="logDescription" [data]=data [loading]=loading [totalRecords]=totalRecords [displaySearch]=displaySearch></app-table> 
    <app-log-details [logDescription]="logDescription"></app-log-details>
    `,
    styles: [`  
        :host {
            width: 100%;
        }
    `],
})
export class EventLogSection implements OnInit, OnDestroy {
    cols = [
        { field: 'createdDate', type: 'text', header: 'Date' },
        { field: 'createdTime', type: 'text', header: 'Time' },
        { field: 'logType', type: 'text', header: 'Log Type' },
        { field: 'userName', type: 'text', header: 'Raised By' },
        { field: 'logClass', type: 'text', header: 'Log Name' },
    ];
    data = [
    ]
    totalRecords: number;
    loading: boolean;
    displaySearch: boolean = true;
    private subject = new Subject<boolean>();
    filterColumns = this.cols.filter(p => p.field !== 'enabled').map<string>(q => q.field);
    selectedUser: any;
    logDescription: string;
    activeItem: boolean;
    i = 0;

    constructor(private userService: AdminUserService 
        ) {
        
    }

    ngOnInit(): void {
        this.loadData();
        this.logDescription= '';
    }

    public loadData() {
        this.loading = true;
        setTimeout(() => {
            this.userService.getEventViewerLoglist().pipe(
                tap((apiResponse) => {
                    console.log(apiResponse);
                    this.data = apiResponse.data.rows;
                    
                    this.totalRecords = apiResponse.data.records;
                    this.loading = false;
                }),
                takeUntil(this.subject)
            ).subscribe();
        }, 10);
    }

    ngAfterViewInit(): void {

    }

    ngOnDestroy(): void {
    }
}
