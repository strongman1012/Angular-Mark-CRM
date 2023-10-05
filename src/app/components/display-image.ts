import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { TableModule as PrimeTableModule } from 'primeng/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import {EditorModule} from 'primeng/editor';
import {ImageModule} from 'primeng/image';


@Component({
    standalone: true,
    selector: 'app-display-image',
    template: `
    <div class="flex px-8 pt-6 pb-8">
        <p-image class="border p-5 mx-auto" src="assets/images/marc-solutions.jpg" alt="Image" width="250"></p-image>
    </div>
    `,
    styles: [`
        :host {
            width: 100%
        }
    `],
    imports: [
        ImageModule,
    ]
})
export class DisplayLogoComponent {
    @Input() rows: any[];
    @Input() buttons: any[];
}

export interface ColumnItems {
    field: string;
    type: string;
    header: string;
}