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
import { CommonModule } from '@angular/common';
import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';


@Component({
    selector: 'grc-ruleset-section',
    template: `
    <section class="mt-10 mx-10">
        <p-card class="w-full justify-center" p-card-header="title">
            <!-- 
            <ng-template pTemplate="header">
                 GRC Ruleset to ACM
            </ng-template> 
            -->
            <div *ngFor="let field of fields" class="flex mt-5 px-5">
                <p class="pr-5 my-auto">{{field.title}}:</p>
                <input class="p-inputtext p-component p-element w-80 mr-5" 
                    type="text" 
                    placeholder={{field.title}}
                >
                <p-fileUpload #fubauto 
                    mode="basic"
                    name="demo[]" 
                    url="./upload.php" 
                    accept="image/*" 
                    maxFileSize="1000000" 
                    (onUpload)="onBasicUploadAuto($event)" 
                    [auto]="true" 
                    chooseLabel="Load">
                </p-fileUpload>
            </div>
            <div class="flex px-5">
                <button pButton 
                    class="mt-10 py-2 px-4 rounded-full" 
                >
                    Convert
                </button>
            </div>
        </p-card>
    </section>
    
    `,
    styles: [`  
        :host {
            width: 100%;
        }
    `],
})
export class CsiQuerySection implements OnInit, OnDestroy {
    loading: boolean;
    fields = [
        {
            title: 'Import MDB File'
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
