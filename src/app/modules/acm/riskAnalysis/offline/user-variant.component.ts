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
    <section>
    <p-panel header="Users Variant">
    <p-checkbox [(ngModel)]="checked" [binary]="true" inputId="binary">New</p-checkbox>
    <div class="flex flex-cols mt-5">
                <div *ngIf="!checked" class="">
                    <h5>Preset Variant</h5>
                    <p-dropdown [options]="countries" [(ngModel)]="selectedCountry" optionLabel="name" [filter]="true"
                        filterBy="name" [showClear]="true" placeholder="Select a Variant">
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
                <div *ngIf="checked" class="">
                    <h5>Variant Name</h5>
                    <div class="field">
                        <input id="username1" type="username" aria-describedby="username1-help" pInputText
                            [(ngModel)]="value4" />
                        <small id="username1-help" class="block">Please enter name of descrition for variant.</small>
                    </div>
                </div>
                <div class="ml-5">
                
                </div>
                <div class="ml-5">
                <h5 class="">System</h5>
                <p-dropdown [options]="cities" [(ngModel)]="selectedCity1" placeholder="Select a System"
                    optionLabel="name" [showClear]="true"></p-dropdown>
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
        <app-table [title]=tableTwoTitle [cols]=subCols [data]=displaySelectionData
            [startingDisplayAmout]=startingDisplayAmout [rowsPerPageOptions]=rowsPerPageOptions [paginator]=false
            [disableSortable]=true></app-table>
    </div>

    <section>
    `,
    encapsulation: ViewEncapsulation.None,
})
export class UserVariantComponent implements AfterViewInit, OnInit {
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
            title: 'Save',
            type: 'button',
            buttonFunc: (event) => { }
        },
        {
            title: 'Delete',
            type: 'button',
            buttonFunc: (event) => { }
        }
    ]
    tableOneTitle = "Users"
    tableTwoTitle = "Users"
    rowsPerPageOptions = [3, 4, 5]
    startingDisplayAmout = 3;
    mainCols = [
        { field: 'rule', type: 'text', header: 'Risk ID' },
        { field: 'description', type: 'text', header: 'Description' },
        { field: 'business-process', type: 'text', header: 'Business Process' },
        { field: 'sub-process', type: 'text', header: 'Sub Process' },
        { field: 'sub-process', type: 'text', header: 'Cross System' },
        { field: 'sub-process', type: 'text', header: 'System Type' },
        { field: 'sub-process', type: 'text', header: 'Condition' },
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
