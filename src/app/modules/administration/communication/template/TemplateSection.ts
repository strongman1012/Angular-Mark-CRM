import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Observable, of, Subject, Subscription, takeUntil, tap } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, ExtraOptions, PreloadAllModules, Router, RouterModule, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ColumnItems, TableComponent } from 'app/components/tables.component';
import { FormComponent } from 'app/components/form';
import { SelectTemplateComponent } from 'app/components/select-template';
import { EmailTemplateComponent } from 'app/components/email-template';
import {CardModule} from 'primeng/card';
import { ButtonModule } from 'primeng/button';


@Component({
    selector: 'communication',
    template: `
    <section class="flex justify-center">
        <p-card class="flex mt-10 justify-center">
            <app-select-template [groupedItems]=groupedItems></app-select-template>
            <app-email-template></app-email-template> 
            <button pButton class="mt-4 py-2 px-4 rounded-full" 
            type="button" [loading]="loading">Confirm Changes</button>
        </p-card>
    </section>
    
    `,
    styles: [`  
        :host {
            width: 100%;
        }
    `],
})
export class TemplateSection implements OnInit, OnDestroy {
    loading: boolean;
    groupedItems = [
        {
            label: 'None', value: 'None',
            items: [
                {label: 'None', value: 'None'},
            ]
            
        },
        {
            label: 'Add User', value: 'Add User',
            items: [
                {label: 'Requester', value: 'Requester'},
                {label: 'User', value: 'User'},
            ]
        },
        {
            label: 'Delete User', value: 'Delete User',
            items: [
                {label: 'Requester', value: 'Requester'},
            ]
        },
        {
            label: 'Edit User', value: 'Edit User',
            items: [
                {label: 'Requester', value: 'Requester'},
            ]
        },
        {
            label: 'Lock User', value: 'Lock User',
            items: [
                {label: 'Requester', value: 'Requester'},
            ]
        },
        {
            label: 'Password', value: 'Password',
            items: [
                {label: 'Requester', value: 'Requester'},
                {label: 'User', value: 'User'},
            ]
        },
        {
            label: 'Self service', value: 'Self service',
            items: [
                {label: 'Self service Unlock & Reset', value: 'Self service Unlock & Reset'},
                {label: 'Self service Unlock', value: 'Self service Unlock'},
            ]
        },
        {
            label: 'Unlock account', value: 'Unlock account',
            items: [
                {label: 'Requester', value: 'Requester'},
            ]
        },
        {
            label: 'Approval', value: 'Approval',
            items: [
                {label: 'Approvals', value: 'Approvals'},
            ]
        },
        {
            label: 'Privilege', value: 'Privilege',
            items: [
                {label: 'Request', value: 'Request'},
                {label: 'Approve', value: 'Approve'},
                {label: 'Review', value: 'Review'},
                {label: 'Review Report', value: 'Review Report'},
            ]
        },
        {
            label: 'Forgot password', value: 'Forgot password',
            items: [
                {label: 'Password recover', value: 'Password recover'},
            ]
        },
        {
            label: 'Mitigation', value: 'Mitigation',
            items: [
                {label: 'Mitigation Assignment Expiry', value: 'Mitigation Assignment Expiry'},
            ]
        },
    ];
    rows= [
        'Add User',
        'Delete User',
        'Edit User',
        'Lock User',
        'Password',
        'Self service',
        'Unlock account',
        'Approval',
        'Privilege',
        'Forgot pasword',
        'Mitigation',
    ]

    buttons = [
        {
            title: 'Test'
        },
        {
            title: 'Test Message'
        },
        {
            title: 'Save'
        }
        
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
