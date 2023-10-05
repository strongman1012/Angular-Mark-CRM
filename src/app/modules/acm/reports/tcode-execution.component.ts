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
    <p-panel header="Filters">
    <div class="flex flex-cols mt-5">
    
            <div class="">
                </div>
                <div class="ml-5">
                    <h5 class="">System</h5>
                    <p-dropdown [options]="cities" [(ngModel)]="selectedCity1" placeholder="Select a System"
                        optionLabel="name" [showClear]="true"></p-dropdown>
                </div>
                <div class="ml-5">
                    <h5>Tcode</h5>
                    <div class="field">
                        <input id="username1" type="username" aria-describedby="username1-help" pInputText
                            [(ngModel)]="value4"/>
                    </div>
                
                </div>
                <div class="ml-5">
                    <h5>User Id</h5>
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
                    <h5>Start Date</h5>
                    <div class="field">
                        <input id="username1" type="username" aria-describedby="username1-help" pInputText
                            [(ngModel)]="value4"/>
                    </div>
                
                </div>
                <div class="ml-5">
                    <h5>End Date</h5>
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
export class TcodeExecutionComponent implements AfterViewInit, OnInit {
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
        {
            title: 'Export Results',
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
        { field: 'description', type: 'text', header: 'User Id' },
        { field: 'business-process', type: 'text', header: 'User Name' },
        { field: 'sub-process', type: 'text', header: 'Transaction Code' },
        { field: 'sub-process', type: 'text', header: 'Transaction Description' },
        { field: 'sub-process', type: 'text', header: 'Transaction Date' },
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
