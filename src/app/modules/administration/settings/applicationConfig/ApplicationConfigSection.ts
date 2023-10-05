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
    <app-table [cols]=cols [data]=data [loading]=loading [totalRecords]=totalRecords [startingDisplayAmout]=startingDisplayAmout></app-table> 
    `,
    styles: [`  
        :host {
            width: 100%;
        }
    `],
})
export class ApplicationConfigSection implements OnInit, OnDestroy {
    cols = [
        { field: 'name', type: 'text', header: '' },
        { field: 'value', type: 'text', header: 'Value' },
        { field: 'setDate', type: 'text', header: 'Last change date' },
        { field: 'description', type: 'text', header: 'Description' },
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
        this.logDescription= '';
        console.log("loaded component")
    }

    public loadData() {
        this.loading = true;
        this.data = [
            {
              "id": 16,
              "name": "storage.max_file_size_mb",
              "value": "15",
              "setDate": "1644399677000",
              "description": null
            },
            {
              "id": 17,
              "name": "storage.allow_file_formats",
              "value": "jpg,xlsx,txt,pdf,png,doc,docx",
              "setDate": "1644399677000",
              "description": null
            },
            {
              "id": 23,
              "name": "password.min_length",
              "value": "9",
              "setDate": "1644399677000",
              "description": null
            },
            {
              "id": 25,
              "name": "password.digit_require",
              "value": "true",
              "setDate": "1644399677000",
              "description": null
            },
            {
              "id": 24,
              "name": "password.special_require",
              "value": "true",
              "setDate": "1644399677000",
              "description": null
            },
            {
              "id": 26,
              "name": "password.upper_require",
              "value": "false",
              "setDate": "1644399677000",
              "description": null
            },
            {
              "id": 22,
              "name": "auth.max_login_attempt_count",
              "value": "10",
              "setDate": "1644399677000",
              "description": null
            },
            {
              "id": 20,
              "name": "mitigations.users_expiration_days",
              "value": "5",
              "setDate": "1644399677000",
              "description": null
            },
            {
              "id": 21,
              "name": "mitigations.users_default_duration_days",
              "value": "30",
              "setDate": "1644399677000",
              "description": null
            },
            {
              "id": 31,
              "name": "transactions.get.duration_limit_hours",
              "value": "1",
              "setDate": "1644399677000",
              "description": null
            },
            {
              "id": 30,
              "name": "privilege.request_overlap_indent_min",
              "value": "1",
              "setDate": "1644399677000",
              "description": null
            },
            {
              "id": 29,
              "name": "rem.duration.days",
              "value": "800",
              "setDate": "1644399677000",
              "description": null
            },
            {
              "id": 53,
              "name": "hide.inactive.icm.controls",
              "value": "true",
              "setDate": "1644399677000",
              "description": null
            },
            {
              "id": 56,
              "name": "sod.risk.controls.duration.days",
              "value": "180",
              "setDate": "1644399677000",
              "description": null
            },
            {
              "id": 54,
              "name": "hide.cam.simulation.requests",
              "value": "true",
              "setDate": "1644399677000",
              "description": null
            },
            {
              "id": 43,
              "name": "offline.sod.results.expiration.days",
              "value": "0",
              "setDate": "1644399677000",
              "description": null
            },
            {
              "id": 55,
              "name": "online.sod.results.expiration.days",
              "value": "0",
              "setDate": "1644399677000",
              "description": null
            },
            {
              "id": 44,
              "name": "simulation.sod.results.expiration.days",
              "value": "0",
              "setDate": "1644399677000",
              "description": null
            },
            {
              "id": 42,
              "name": "dashboard.sod.results.expiration.days",
              "value": "0",
              "setDate": "1644399677000",
              "description": null
            },
            {
              "id": 40,
              "name": "license.type.change.notification",
              "value": "false",
              "setDate": "1644399677000",
              "description": null
            },
            {
              "id": 37,
              "name": "sod.analysis.reference.user",
              "value": "true",
              "setDate": "1644399677000",
              "description": null
            },
            {
              "id": 38,
              "name": "sod.dashboard.chart.results",
              "value": "true",
              "setDate": "1644399677000",
              "description": null
            },
            {
              "id": 41,
              "name": "privilege.request_minimum_duration_min",
              "value": "15",
              "setDate": "1644399677000",
              "description": null
            },
            {
              "id": 39,
              "name": "cam.request_role_default_duration_days",
              "value": "1000",
              "setDate": "1644399677000",
              "description": null
            },
            {
              "id": 57,
              "name": "restservice.reporting_unit",
              "value": "DatAero",
              "setDate": "1653802874000",
              "description": ""
            }
          ];
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
