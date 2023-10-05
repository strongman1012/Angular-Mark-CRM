import { Component, OnDestroy, OnInit } from '@angular/core';
import { TableComponent } from 'app/components/tables.component';

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
export class JobsSection implements OnInit, OnDestroy {
    cols = [
        { field: 'profile', type: 'text', header: 'Profile' },
        { field: 'status', type: 'text', header: 'Status' },
        { field: 'started-on', type: 'text', header: 'Started On' },
        { field: 'completed-on', type: 'text', header: 'Completed On' },
        { field: 'percentage-completion', type: 'text', header: 'Percentage Completion' },
    ];

    data = [
        {
            profile: 'type',
            status: 'text',
            'started-on': 'Type',
            'completed-on': 'Type',
            'percentage-completion': 'Type'
        },
    ]
    title = 'Data Extraction Jobs';

    constructor() {

    }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {

    }

    ngOnDestroy(): void {
    }
}
