import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule as PrimeTableModule } from 'primeng/table';


@Component({
    standalone: true,
    selector: 'app-action-form',
    template: `
    <div class="flex-auto">
        <h2 mat-dialog-title>Create or Update User</h2>
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
export class ActionFormComponent {
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