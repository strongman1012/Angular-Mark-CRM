import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Observable, of, Subject, Subscription, takeUntil, tap } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { TableModule as PrimeTableModule } from 'primeng/table';
import { ActivatedRoute, ParamMap, Params, Router } from '@angular/router';
import { TableComponent } from 'app/components/tables.component';
import { settings } from 'app/mock-api/apps/mailbox/data';
import { ApplicationConfigSection } from './applicationConfig/ApplicationConfigSection';
import { AuditLogs } from './applicationConfig/AuditLogs';

const navigate = {
    'application-config': {
        component: ApplicationConfigSection 
    },
    'audit-logs': {
        component: AuditLogs
    }
}
@Component({
    standalone: true,
    selector: 'communication',
    template: `<ng-template #viewContainerRef style="width:100%"></ng-template>`,
    styles: [`
        
    `],
    encapsulation: ViewEncapsulation.None,
    imports: [
        PrimeTableModule,
        CommonModule,
    ]
})
export class SettingsPage implements OnInit, OnDestroy {
    @ViewChild("viewContainerRef", { read: ViewContainerRef }) vcr!: ViewContainerRef;
    ref!: ComponentRef<any>
    value: any;
    currentComponentView: any;


    constructor(private router: Router, private route: ActivatedRoute, private viewContainerRef: ViewContainerRef, private cdref: ChangeDetectorRef) {
        route.params.subscribe(val => {
            this.value = this.route.snapshot.paramMap;
            console.log(this.value);
            this.removeComponent();
            this.addComponent();
        });

    }
    private addComponent() {
        if (this.vcr && this.ref) {
            this.loadComponent();
        }
    }

    private removeComponent() {
        if (this.vcr?.length > 0) {
            this.vcr.remove(0);
        }
    }

    loadComponent(): void {
        var component = this.getComponentForNav(this.value);
        this.ref = this.vcr.createComponent(component);
    }

    getComponentForNav(paths: ParamMap) {
        let nav = navigate;
        var component = null;
        paths.keys.forEach(element => {
            if (nav[paths.get(element)]){
                nav = nav[paths.get(element)]
            } 
            if (nav['component']){
                component = nav['component']
            }
        });
        return component;
    }

    ngOnInit(): void {


    }
    ngAfterViewInit(): void {
        console.log('init child view')
        this.loadComponent();
        this.cdref.detectChanges();

    }

    ngOnDestroy(): void {
    }
}
