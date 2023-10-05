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
export class LogSection implements OnInit, OnDestroy {
    cols = [
        { field: 'type', type: 'text', header: 'Type' },
        { field: 'recipient', type: 'text', header: 'Recipient' },
        { field: 'time', type: 'text', header: 'Time' },
    ];

    data = [
        { type: 'type', recipient: 'text', time: 'Type' },
        { type: 'type', recipient: 'text', time: 'Type' },
        { type: 'type', recipient: 'text', time: 'Type' },
        { type: 'type', recipient: 'text', time: 'Type' },
        { type: 'type', recipient: 'text', time: 'Type' },
        { type: 'type', recipient: 'text', time: 'Type' },
        { type: 'type', recipient: 'text', time: 'Type' },
        { type: 'type', recipient: 'text', time: 'Type' },
        { type: 'type', recipient: 'text', time: 'Type' },
        { type: 'type', recipient: 'text', time: 'Type' },
        { type: 'type', recipient: 'text', time: 'Type' },
        { type: 'type', recipient: 'text', time: 'Type' },
        { type: 'type', recipient: 'text', time: 'Type' },
        { type: 'type', recipient: 'text', time: 'Type' },
    ]
    title = 'communication test';

    constructor() {
        
    }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {

    }

    ngOnDestroy(): void {
    }
}
