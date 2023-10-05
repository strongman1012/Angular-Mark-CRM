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
        <div class="w-full">
            <app-edit-table [title]=tableOneTitle [cols]=mainCols [data]=data [startingDisplayAmout]=startingDisplayAmout
                [rowsPerPageOptions]=rowsPerPageOptions></app-edit-table>
        </div>
    <section>
    `,
    encapsulation: ViewEncapsulation.None,
})
export class ReviewRuleComponent implements AfterViewInit, OnInit {

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
    tableOneTitle = "Pam Review Rule"
    tableTwoTitle = "Users"
    rowsPerPageOptions = [3, 4, 5]
    startingDisplayAmout = 3;
    mainCols = [
        { field: 'description', type: 'text', header: 'Privilege ID' },
        { field: 'business-process', type: 'text', header: 'Description' },
        { field: 'sub-process', type: 'text', header: 'Created On' },
        { field: 'sub-process2', type: 'text', header: 'Log Review' },
    ];
    subCols = [
        { field: 'auth-object', type: 'text', header: 'Rule ID' },
        { field: 'auth-field', type: 'text', header: 'Description' },
        { field: 'value', type: 'text', header: 'Business Process' },
        { field: 'join-by-and', type: 'text', header: 'Sub Process' },
        { field: 'join-by-and', type: 'text', header: 'Type' },
    ];
    data = [
        {
            description: 'test',
            'business-process': 'test',
            'sub-process': 'test',
            'sub-process2': 'test',
        }, 
        {
            description: 'test',
            'business-process': 'test',
            'sub-process': 'test',
            'sub-process2': 'test',
        }, 
        {
            description: 'test',
            'business-process': 'test',
            'sub-process': 'test',
            'sub-process2': 'test',
        }, 
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
