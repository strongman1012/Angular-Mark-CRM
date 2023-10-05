import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { TableModule as PrimeTableModule } from 'primeng/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DropdownModule } from 'primeng/dropdown';


@Component({
    standalone: true,
    selector: 'app-select-template',
    template: `
    <div class="flex-auto p-component rounded px-8 pt-6 pb-8 mb-4 w-full mt-10 min-w-full md:min-w-0">
        <p class="mb-4">Select Template:</p>
        <p-dropdown autoWidth="false" [options]="groupedItems" [style]="{'width':'100%'}" [group]="true"></p-dropdown>
    </div>
    `,
    styles: [`
        :host {
            width: 100%
        } 
    `],
    // encapsulation: ViewEncapsulation.None,
    imports: [
        DropdownModule,
    ]
})
export class SelectTemplateComponent {
    @Input() rows: any[];
    @Input() buttons: any[];
    @Input() groupedItems: any[];
}

export interface ColumnItems {
    field: string;
    type: string;
    header: string;
}