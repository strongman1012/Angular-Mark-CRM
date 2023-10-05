import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { IconsModule } from 'app/core/icons/icons.module';
import { FileUploadModule } from 'primeng/fileupload';


@Component({
    standalone: true,
    selector: 'app-operation-button',
    template: `
    <div class="flex flex-cols">
        <div *ngFor="let item of operations ; first as isFirst; last as isLast">
            <div *ngIf="isFirst && isLast" [ngClass]="item.class + ' text-blue-900 hover:text-white flex justify-center rounded-[12px] px-3 border border-y border-blue-900 p-1 hover:bg-blue-900'">
            </div>
            <div *ngIf="isFirst && !isLast" [ngClass]="item.class + ' text-blue-900 hover:text-white flex justify-center rounded-l-[12px] pl-3 border-l border-y border-blue-900 p-1 hover:bg-blue-900'">
            </div>
            <div *ngIf="isLast && !isFirst" [ngClass]="item.class +' '+ 'text-green-600 flex justify-center border-l rounded-r-[12px] pr-2 border-r border-y border-blue-900 p-1 pr-3 hover:bg-blue-900'">
            </div>
            <div *ngIf="!isFirst && !isLast" [ngClass]="item.class + ' text-blue-900 hover:text-white flex justify-center border-l border-y border-blue-900 p-1 hover:bg-blue-900'">
            </div>
        </div>
        
    </div>
    
    `,
    styles: [`
    :host {
        width: 100%
    }
    `],
    imports: [
        FileUploadModule,
        HttpClientModule,
        IconsModule,
        CommonModule,
    ]
})
export class OperationButtonComponent {
    @Input() rows: any[];
    @Input() buttons: any[];
    @Input() operations: any[];
}

export interface ColumnItems {
    field: string;
    type: string;
    header: string;
}