import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Observable, of, Subject, Subscription, takeUntil, tap } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, ExtraOptions, PreloadAllModules, Router, RouterModule, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ColumnItems, TableComponent } from 'app/components/tables.component';
import { FormComponent } from 'app/components/form';
import { SelectTemplateComponent } from 'app/components/select-template';
import { EmailTemplateComponent } from 'app/components/email-template';
import {CardModule} from 'primeng/card';
import { DisplayLogoComponent } from 'app/components/display-image';
import { UploadImageComponent } from 'app/components/upload-button';


@Component({
    selector: 'communication',
    template: `
        <p-card class="flex mt-10" [style]="{'width': '60%', 'margin': '0 auto'}">
            <app-display-image></app-display-image>
            <app-upload-image></app-upload-image>
        </p-card>
    `,
    styles: [`  
        :host {
            width: 100%;
        }
    `],
})
export class LogoSection implements OnInit, OnDestroy {
    rows= [
        { 
            title: 'Host',
            id: 'host',
            placeHolder: 'Host'
        },
        { 
            title: 'Port',
            id: 'port',
            placeHolder: 'Port'
        },
        { 
            title: 'Auth type',
            id: 'authType',
            placeHolder: 'Auth type'
        },
        { 
            title: 'Username',
            id: 'username',
            placeHolder: 'Username'
        },
        { 
            title: 'Password',
            id: 'password',
            placeHolder: '**************'
        },
        { 
            title: 'Sender',
            id: 'sender',
            placeHolder: 'Sender'
        }
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
