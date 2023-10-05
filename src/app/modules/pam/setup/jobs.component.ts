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
        <app-table [title]=tableOneTitle [cols]=mainCols [data]=data [startingDisplayAmout]=startingDisplayAmout
            [rowsPerPageOptions]=rowsPerPageOptions [operations]=operations></app-table>
    </div>

    <section>
    `,
    encapsulation: ViewEncapsulation.None,
})
export class JobsComponent implements AfterViewInit, OnInit {
    operations = [
        {
            class: "pi pi-list"
        },
    ]
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
    tableOneTitle = "Jobs"
    tableTwoTitle = "Users"
    rowsPerPageOptions = [3, 4, 5]
    startingDisplayAmout = 3;
    mainCols = [
        { field: 'description', type: 'text', header: 'System' },
        { field: 'business-process', type: 'text', header: 'Planned Date' },
        { field: 'sub-process', type: 'text', header: 'Start Date' },
        { field: 'sub-process2', type: 'text', header: 'End Date' },
        { field: 'sub-process2', type: 'text', header: 'Status' },
        { field: 'sub-process2', type: 'text', header: 'Transaction Amount' },
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
