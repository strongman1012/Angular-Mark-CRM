import { ChangeDetectorRef, Component, Input, NgModule, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { TableModule as PrimeTableModule } from 'primeng/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CardModule } from 'primeng/card';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { OverlayModule } from 'primeng/overlay';
import { FormsModule } from '@angular/forms';


@Component({
    standalone: true,
    selector: 'app-log-details',
    template: `
    <div class="flex-auto mx-10" >
        <p-card class="p-component">
            <p>Log Detail:</p>
            <textarea class="border mt-4" disabled=true id="float-input" rows="5" style="width:100%" pInputTextarea>
            {{logDescription}}
            </textarea>
        </p-card>
    </div>
    `,
    styles: [`
     
    `],
    // encapsulation: ViewEncapsulation.None,
    imports: [
        PrimeTableModule,
        CommonModule,
        MatFormFieldModule,
        CardModule,
        FormsModule
    ]
})
export class LogDetailsComponent implements OnInit, OnDestroy, OnChanges{
    public _selected: string;
    @Input() rows: any[];
    @Input() buttons: any[];
    @Input() logDescription: string;

    constructor(private cdRef: ChangeDetectorRef) {
    }
    ngOnChanges(changes: SimpleChanges) {
        console.log(changes);
    }
    ngOnDestroy(): void {
        console.log("changes")
    }

    ngOnInit(): void {
        this.cdRef.detectChanges();
    }
 }

export interface ColumnItems {
    field: string;
    type: string;
    header: string;
}