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
    <p-panel header="My Approvals">
    <div class="flex flex-cols mt-5 flex-wrap">              
                <div class="ml-5">
                    <h5>System</h5>
                    <div class="field">
                        <input id="username1" type="username" aria-describedby="username1-help" pInputText
                            [(ngModel)]="value4"/>
                    </div>
                
                </div>
                <div class="ml-5">
                    <h5>User ID</h5>
                    <div class="field">
                        <input id="username1" type="username" aria-describedby="username1-help" pInputText
                            [(ngModel)]="value4"/>
                    </div>
                
                </div>
                <div class="ml-5">
                    <h5>User Name</h5>
                    <div class="field">
                        <input id="username1" type="username" aria-describedby="username1-help" pInputText
                            [(ngModel)]="value4"/>
                    </div>
                
                </div>
                <div class="ml-5">
                    <h5>Valid Form</h5>
                    <div class="field">
                        <input id="username1" type="username" aria-describedby="username1-help" pInputText
                            [(ngModel)]="value4"/>
                    </div>
                
                </div>
                <div class="ml-5">
                    <h5>Valid To</h5>
                    <div class="field">
                        <input id="username1" type="username" aria-describedby="username1-help" pInputText
                            [(ngModel)]="value4"/>
                    </div>
                
                </div>
            </div>
           
            
            <div class="flex mt-5 flex-rows">
                <div class="flex" *ngFor="let button of buttons">
                    <button pButton *ngIf="button.type == 'submit'" class=" ml-2 py-2 px-4 rounded-full"
                        type={{button.type}} [loading]="button.title == loading">
                        {{button.title}}
                    </button>
                    <button pButton *ngIf="button.type != 'submit'" class=" ml-2 py-2 px-4 rounded-full"
                        type={{button.type}} (click)="button.buttonFunc(checkoutForm)"
                        [loading]="button.title == loading">
                        {{button.title}}
                    </button>
                </div>
            </div>
    </p-panel>
    
    <div class="w-full">
        <app-table [title]=tableOneTitle [cols]=mainCols [data]=data [startingDisplayAmout]=startingDisplayAmout
            [rowsPerPageOptions]=rowsPerPageOptions></app-table>
    </div>

    <section>
    `,
    encapsulation: ViewEncapsulation.None,
})
export class CentralUserReportComponent implements AfterViewInit, OnInit {
    countries = [
        { name: 'Australia', code: 'AU' },
        { name: 'Brazil', code: 'BR' },
        { name: 'China', code: 'CN' },
        { name: 'Egypt', code: 'EG' },
        { name: 'France', code: 'FR' },
        { name: 'Germany', code: 'DE' },
        { name: 'India', code: 'IN' },
        { name: 'Japan', code: 'JP' },
        { name: 'Spain', code: 'ES' },
        { name: 'United States', code: 'US' }
    ];
    cities = [
        { name: 'New York', code: 'NY' },
        { name: 'Rome', code: 'RM' },
        { name: 'London', code: 'LDN' },
        { name: 'Istanbul', code: 'IST' },
        { name: 'Paris', code: 'PRS' }
    ];
    selectedCountry = null;
    selectedCity1 = null;
    checked: boolean = false;
    value4: string;
    buttons = [
        {
            title: 'Search',
            type: 'button',
            buttonFunc: (event) => { }
        },
        
    ]
    tableOneTitle = ""
    tableTwoTitle = "Users"
    rowsPerPageOptions = [3, 4, 5]
    startingDisplayAmout = 3;
    mainCols = [
        { field: 'rule', type: 'text', header: 'System' },
        { field: 'description', type: 'text', header: 'System Type' },
        { field: 'business-process', type: 'text', header: 'User ID' },
        { field: 'sub-process', type: 'text', header: 'Name' },
        { field: 'sub-process', type: 'text', header: 'Group' },
        { field: 'sub-process', type: 'text', header: 'Type' },
        { field: 'sub-process', type: 'text', header: 'Locked' },
        { field: 'sub-process', type: 'text', header: 'Valid From' },
        { field: 'sub-process', type: 'text', header: 'Valid To' },
        { field: 'sub-process', type: 'text', header: 'Last Login' },
        { field: 'sub-process', type: 'text', header: 'Creation Date' },
        { field: 'sub-process', type: 'text', header: 'Has Role' },
    ];
    subCols = [
        { field: 'auth-object', type: 'text', header: 'Rule ID' },
        { field: 'auth-field', type: 'text', header: 'Description' },
        { field: 'value', type: 'text', header: 'Business Process' },
        { field: 'join-by-and', type: 'text', header: 'Sub Process' },
        { field: 'join-by-and', type: 'text', header: 'Type' },
    ];
    data = [
        {},{},{}
    ]
    displaySelectionData = {}

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
