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
    <div class="w-full">
        <app-table 
            [title]=tableOneTitle 
            [cols]=mainCols 
            [data]=data 
            [startingDisplayAmout]=startingDisplayAmout 
            [rowsPerPageOptions]=rowsPerPageOptions 
        ></app-table> 
        <app-table 
            [title]=tableTwoTitle 
            [cols]=subCols [data]=displaySelectionData 
            [startingDisplayAmout]=startingDisplayAmout 
            [rowsPerPageOptions]=rowsPerPageOptions 
            [paginator]=false
            [disableSortable]=true
        ></app-table> 
    </div> 
    `,
    encapsulation: ViewEncapsulation.None,
})
export class OrgFieldComponent implements AfterViewInit, OnInit {
    tableOneTitle = "ORG Fields"
    tableTwoTitle = "Org Field Values"
    rowsPerPageOptions = [3, 4, 5]
    startingDisplayAmout = 3;
    
    mainCols = [
        { field: 'rule', type: 'text', header: 'ORG Field' },
        { field: 'description', type: 'text', header: 'Description' },
        { field: 'business-process', type: 'text', header: 'SAP System' },
        { field: 'sub-process', type: 'text', header: 'Active' },
    ];

    subCols = [
        { field: 'auth-object', type: 'text', header: 'Organization' },
        { field: 'auth-field', type: 'text', header: 'Field Value' },
    ];

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
