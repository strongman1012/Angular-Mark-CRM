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
        <p-panel header="Owner Asignment">
            <div class="flex flex-cols mt-5">
                <div class="">
                    <p-dropdown [options]="countries" [(ngModel)]="selectedCountry" optionLabel="name" [filter]="true"
                        filterBy="name" [showClear]="true" placeholder="Select Owner">
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
            <app-table [title]=tableOneTitle [cols]=mainCols [data]=data [startingDisplayAmout]=startingDisplayAmout
                [rowsPerPageOptions]=rowsPerPageOptions></app-table>
        </div>
    <section>
    `,
    encapsulation: ViewEncapsulation.None,
})
export class AcmOwnersComponent implements AfterViewInit, OnInit {
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
    tableOneTitle = "Risks"
    tableTwoTitle = "Selected Risk"
    rowsPerPageOptions = [3, 4, 5]
    startingDisplayAmout = 3;
    mainCols = [
        { field: 'rule', type: 'text', header: 'UserId' },
        { field: 'description', type: 'text', header: 'First Name' },
        { field: 'business-process', type: 'text', header: 'Last Name' },
        { field: 'sub-process', type: 'text', header: 'Email' },
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