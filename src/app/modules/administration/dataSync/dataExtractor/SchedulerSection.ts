import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Observable, of, Subject, Subscription, takeUntil, tap } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, ExtraOptions, PreloadAllModules, Router, RouterModule, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ColumnItems, TableComponent } from 'app/components/tables.component';

@Component({
    selector: 'logs',
    template: `
    <app-table [cols]=cols [data]=data title={{title}}\> 
    `,
    styles: [`  
        :host {
            width: 100%;
        }
    `],
})
export class SchedulerSection implements OnInit, OnDestroy {
    cols = [
        { field: 'profile-name', type: 'text', header: 'Profile Name' },
        { field: 'started-date', type: 'text', header: 'Started Date' },
        { field: 'end-date', type: 'text', header: 'End Date' },
        { field: 'repeat-after', type: 'text', header: 'Repeat After' },
        { field: 'last-executed-on', type: 'text', header: 'Last Executed On' },
        { field: 'next-execution', type: 'text', header: 'Next Executed' },
    ];

    data = [
        {
            'profile-name': 'type',
            'started-date': 'text',
            'end-date': 'Type',
            'repeat-after': 'Type',
            'last-executed-on': 'Type',
            'next-execution': 'Type'
        },
    ]
    title = 'Scheduled Extraction Tasks';

    constructor() {

    }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {

    }

    ngOnDestroy(): void {
    }
}
