import { Component, OnDestroy, OnInit } from '@angular/core';

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
export class ProfilesSection implements OnInit, OnDestroy {
    cols = [
        { field: 'profile', type: 'text', header: 'Profile' },
        { field: 'system', type: 'text', header: 'System' },
        { field: 'description', type: 'text', header: 'Description' },
        { field: 'batch-size', type: 'text', header: 'Batch Size' },
        { field: 'existing-tables', type: 'text', header: 'Existing Tables' },
    ];

    data = [
        { profile: 'type', system: 'text', description: 'Type', 'batch-size': 'Type', 'existing-tables': 'Type' },
    ]
    title = 'Data Extraction Profiles';

    constructor() {
        
    }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {

    }

    ngOnDestroy(): void {
    }
}
