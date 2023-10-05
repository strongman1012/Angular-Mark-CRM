import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { TableModule as PrimeTableModule } from 'primeng/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import {EditorModule} from 'primeng/editor';


@Component({
    standalone: true,
    selector: 'app-email-template',
    template: `
    <div class="flex-auto p-component px-8 pt-6 pb-8 mb-4 mt-10 min-w-full md:min-w-0">
            <p class="mb-4">Editor: </p>
            <p-editor [style]="{'height':'220px'}"></p-editor>
            <p class="mt-5 text-center text-gray-500 text-xs">
                &copy;2022 Marc solutions. All rights reserved.
            </p>
    </div>
    `,
    styles: [`
    :host {
        // width: 60%
    }
    `],
    imports: [
        EditorModule,
    ]
})
export class EmailTemplateComponent {
    @Input() rows: any[];
    @Input() buttons: any[];
}

export interface ColumnItems {
    field: string;
    type: string;
    header: string;
}