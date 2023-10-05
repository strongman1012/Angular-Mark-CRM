import { Component, Input, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { TableModule as PrimeTableModule } from 'primeng/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CardModule } from 'primeng/card';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {ButtonModule} from 'primeng/button'


@Component({
    standalone: true,
    selector: 'variant-form',
    template: `
    <div class="flex-auto">
        <p-card class="p-component my-4">
            <form class="px-5" [formGroup]="checkoutForm" (ngSubmit)="onSubmit(checkoutForm)">
                <div *ngFor="let row of rows | keyvalue: asIsOrder" class="mb-4">
                    <label class=" font-bold mb-2" for="username">
                        {{row.value.title}}
                    </label>
                    <input class="mt-5 p-inputtext p-component p-element w-full" 
                    id={{row.key}} 
                    type="text" 
                    placeholder={{this.addControl(row.key)}} 
                    formControlName={{row.key}}>
                </div>
                <div class="flex">
                    <div class="flex w-65 ml-auto">
                        <div *ngFor="let button of buttons">
                            <button pButton *ngIf="button.type == 'submit'" class="ml-2 py-2 px-4 rounded-full" 
                            type={{button.type}} [loading]="button.title == loading">
                                {{button.title}}
                            </button>
                            <button pButton *ngIf="button.type != 'submit'" class="ml-2 py-2 px-4 rounded-full" 
                            type={{button.type}} (click)="button.buttonFunc(checkoutForm)" [loading]="button.title == loading">
                                {{button.title}}
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </p-card>
        <p class="text-center text-gray-500 text-xs">
            &copy;2022 Marc solutions. All rights reserved.
        </p>
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
        ReactiveFormsModule,
        ButtonModule
    ]
})
export class FormComponent {
    @Input() loading: string;
    @Input() rows: any[];
    @Input() buttons: any[];
    @Input() data: any;
    @Input() getPlaceholderOrDefault: (arg0: string) => string;
    @Input() onSubmit: (arg0: any) => void;
    
    constructor(private formBuilder: FormBuilder){
    }

    checkoutForm = this.formBuilder.group({
      });

    addControl(key) {
        this.checkoutForm.addControl(key, new FormControl(''));
        // this.checkoutForm.addControl(key, new FormControl('', Validators.required));
        return this.getPlaceholderOrDefault(key);
    }

    asIsOrder(a, b) {
        return 1;
    }
}

export interface ColumnItems {
    field: string;
    type: string;
    header: string;
}