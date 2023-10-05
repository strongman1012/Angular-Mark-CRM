import {
    AfterViewInit,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';


@Component({
    selector: 'rules-component',
    template: `
    <section class="w-full">
    <p-panel header="User Browser">
            <div class="flex flex-cols mt-5">
                <div class="">
                    <p-dropdown [options]="countries" [(ngModel)]="selectedCountry" optionLabel="name" [filter]="true"
                        filterBy="name" [showClear]="true" placeholder="Select System">
                        <ng-template pTemplate="selectedItem">
                            <div class="country-item country-item-value" *ngIf="selectedCountry">
                                <div>{{selectedCountry.name}}</div>
                            </div>
                        </ng-template>
                        <ng-template let-country pTemplate="item">
                            <div class="country-item">
                                <div>{{country.name}}</div>
                            </div>
                        </ng-template>
                    </p-dropdown>
                </div>
            </div>
    </p-panel>
    <div class="w-full">
        <app-table 
            [title]=tableOneTitle 
            [cols]=mainCols 
            [data]=data 
            [startingDisplayAmout]=startingDisplayAmout 
            [rowsPerPageOptions]=rowsPerPageOptions 
        ></app-table> 
        <mat-tab-group>
            <mat-tab label="Roles Assigned to User">
                <app-table 
                    [title]=tableOneTitle 
                    [cols]=table1 
                    [data]=data 
                    [startingDisplayAmout]=startingDisplayAmout 
                    [rowsPerPageOptions]=rowsPerPageOptions 
                ></app-table> 
            </mat-tab>
            <mat-tab label="Role Authorizations">
                <app-table 
                    [title]=tableOneTitle 
                    [cols]=table2 
                    [data]=data 
                    [startingDisplayAmout]=startingDisplayAmout 
                    [rowsPerPageOptions]=rowsPerPageOptions 
                ></app-table> 
            </mat-tab>
        </mat-tab-group>
    </div> 
    </section>
    `,
    encapsulation: ViewEncapsulation.None,
})
export class UserBrowserComponent implements AfterViewInit, OnInit {
    tableOneTitle = "Users"
    tableTwoTitle = "Rules"
    rowsPerPageOptions = [3, 4, 5]
    startingDisplayAmout = 3;
    mainCols = [
        { field: 'rule', type: 'text', header: 'User ID' },
        { field: 'description', type: 'text', header: 'Name' },
        { field: 'business-process', type: 'text', header: 'Group' },
        { field: 'sub-process', type: 'text', header: 'Type' },
        { field: 'sub-process', type: 'text', header: 'Valid To' },
    ];
    table1 = [
        { field: 'auth-object', type: 'text', header: 'User ID' },
        { field: 'auth-field', type: 'text', header: 'First Name' },
        { field: 'value', type: 'text', header: 'Last Name' },
        { field: 'join-by-and', type: 'text', header: 'From Date' },
        { field: 'join-by-and', type: 'text', header: 'To Date' },
    ];
    table2 = [
        { field: 'auth-object', type: 'text', header: 'User ID' },
        { field: 'auth-field', type: 'text', header: 'First Name' },
        { field: 'value', type: 'text', header: 'Last Name' },
        { field: 'join-by-and', type: 'text', header: 'Email' },
    ];

    table3 = [
        { field: 'auth-object', type: 'text', header: 'Control Name' },
        { field: 'auth-field', type: 'text', header: 'Description' },
    ];
    countries = []
    selectedCountry = {}

    data = [
        {
            "id": 37160,
            "username": "JAYCHANDRA",
            "time": "1468750801000",
            "table": "authorities",
            "action": "INSERT",
            "auditableId": null,
            "auditableName": "ROLE_ADMIN",
            "values": {
                "user": "JAYCHANDRA - Jay Chandra",
                "authority": "ROLE_ADMIN"
            },
            "previousValues": {

            }
        },
        {
            "id": 37161,
            "username": "JAYCHANDRA",
            "time": "1487760657000",
            "table": "users",
            "action": "INSERT",
            "auditableId": null,
            "auditableName": "MANOJR - MANOJ RAVI",
            "values": {
                "_com_grc_riskanalysis_entity_admin_Authorities_user": "MANOJR - MANOJ RAVI",
                "firstName": "MANOJ",
                "lastName": "RAVI",
                "password": "$2a$10$p3/3lcQf8k4SXxalIdhK3e5IxsX1f8Ky205g4G0.YltbfBu7.DBAK",
                "initial": "false",
                "roles": "[]",
                "reportingUnits": "[]",
                "authorities": "[]",
                "enabled": "true",
                "username": "MANOJR"
            },
            "previousValues": {

            }
        },
        {
            "id": 37162,
            "username": "JAYCHANDRA",
            "time": "1487760666000",
            "table": "users",
            "action": "UPDATE",
            "auditableId": 98,
            "auditableName": "MANOJR - MANOJ RAVI",
            "values": {
                "_com_grc_riskanalysis_entity_admin_Authorities_user": "MANOJR - MANOJ RAVI",
                "firstName": "MANOJ",
                "lastName": "RAVI",
                "password": "$2a$10$p3/3lcQf8k4SXxalIdhK3e5IxsX1f8Ky205g4G0.YltbfBu7.DBAK",
                "initial": "false",
                "roles": "[]",
                "authorities": "[]",
                "enabled": "true",
                "username": "MANOJR"
            },
            "previousValues": {
                "_com_grc_riskanalysis_entity_admin_Authorities_user": "MANOJR - MANOJ RAVI",
                "firstName": "MANOJ",
                "lastName": "RAVI",
                "password": "$2a$10$p3/3lcQf8k4SXxalIdhK3e5IxsX1f8Ky205g4G0.YltbfBu7.DBAK",
                "initial": "false",
                "roles": "[]",
                "reportingUnits": "[]",
                "authorities": "[]",
                "enabled": "true",
                "username": "MANOJR"
            }
        },
        {
            "id": 37163,
            "username": "JAYCHANDRA",
            "time": "1487760676000",
            "table": "authorities",
            "action": "INSERT",
            "auditableId": null,
            "auditableName": "ROLE_ADMIN",
            "values": {
                "user": "MANOJR - MANOJ RAVI",
                "authority": "ROLE_ADMIN"
            },
            "previousValues": {

            }
        },
        {
            "id": 37164,
            "username": "JAYCHANDRA",
            "time": "1487760676000",
            "table": "users",
            "action": "UPDATE",
            "auditableId": 98,
            "auditableName": "MANOJR - MANOJ RAVI",
            "values": {
                "_com_grc_riskanalysis_entity_admin_Authorities_user": "MANOJR - MANOJ RAVI",
                "firstName": "MANOJ",
                "lastName": "RAVI",
                "password": "$2a$10$p3/3lcQf8k4SXxalIdhK3e5IxsX1f8Ky205g4G0.YltbfBu7.DBAK",
                "initial": "false",
                "enabled": "true",
                "username": "MANOJR"
            },
            "previousValues": {
                "_com_grc_riskanalysis_entity_admin_Authorities_user": "MANOJR - MANOJ RAVI",
                "firstName": "MANOJ",
                "lastName": "RAVI",
                "password": "$2a$10$p3/3lcQf8k4SXxalIdhK3e5IxsX1f8Ky205g4G0.YltbfBu7.DBAK",
                "initial": "false",
                "roles": "[]",
                "authorities": "[]",
                "enabled": "true",
                "username": "MANOJR"
            }
        },
        {
            "id": 37165,
            "username": "MANOJR",
            "time": "1487761625000",
            "table": "business_process",
            "action": "INSERT",
            "auditableId": null,
            "auditableName": "ICT",
            "values": {
                "name": "ICT"
            },
            "previousValues": {

            }
        },
        {
            "id": 37166,
            "username": "MANOJR",
            "time": "1487761625000",
            "table": "business_sub_process",
            "action": "INSERT",
            "auditableId": null,
            "auditableName": "ICT",
            "values": {
                "name": "ICT",
                "process": "ICT"
            },
            "previousValues": {

            }
        },
        {
            "id": 37167,
            "username": "MANOJR",
            "time": "1487761625000",
            "table": "rule",
            "action": "INSERT",
            "auditableId": null,
            "auditableName": "BC001_00",
            "values": {
                "businessProcess": "ICT",
                "modifiedOn": "Wed Feb 22 12:07:04 IST 2017",
                "subProc": "ICT",
                "ruleName": "BC001_00",
                "createdOn": "Wed Feb 22 12:07:04 IST 2017",
                "ruleDescription": "Execute ABAPs Directly (SA38)"
            },
            "previousValues": {

            }
        },
        {
            "id": 37168,
            "username": "MANOJR",
            "time": "1487761625000",
            "table": "rule",
            "action": "INSERT",
            "auditableId": null,
            "auditableName": "BC002_00",
            "values": {
                "businessProcess": "ICT",
                "modifiedOn": "Wed Feb 22 12:07:04 IST 2017",
                "subProc": "ICT",
                "ruleName": "BC002_00",
                "createdOn": "Wed Feb 22 12:07:04 IST 2017",
                "ruleDescription": "Execute ABAPs Directly (Backdoors)"
            },
            "previousValues": {

            }
        },
        {
            "id": 37169,
            "username": "MANOJR",
            "time": "1487761625000",
            "table": "rule",
            "action": "INSERT",
            "auditableId": null,
            "auditableName": "BC004_00",
            "values": {
                "businessProcess": "ICT",
                "modifiedOn": "Wed Feb 22 12:07:04 IST 2017",
                "subProc": "ICT",
                "ruleName": "BC004_00",
                "createdOn": "Wed Feb 22 12:07:04 IST 2017",
                "ruleDescription": "Maintain Tables (Client-Dependent)"
            },
            "previousValues": {

            }
        }
    ]
    displaySelectionData = [
        {
            "property": "user",
            "before": "",
            "after": "JAYCHANDRA - Jay Chandra"
        },
        {
            "property": "authority",
            "before": "",
            "after": "ROLE_ADMIN"
        },

    ]

    title = 'communication test';

    dailyEvents = {
        labels: "test",
        datasets: [
            {
                label: 'Event',
                data: [],
            },

        ],
    };
    dailyEventOptions = {
        plugins: {
            tooltip: {
                enabled: true, // <-- this option disables tooltips
            },
            legend: {
                display: false,
            },
        },
    };
    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        public dialog: MatDialog
    ) {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
    }

    openDialog() {
    }
}
