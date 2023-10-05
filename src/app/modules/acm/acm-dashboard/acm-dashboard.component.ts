import {
    AfterViewInit,
    Component,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';


@Component({
    selector: 'acm-dashboard',
    template: `
    <div class="flex flex-col p-3  w-full">
        <mat-tab-group>
            <mat-tab label="SOD Chart">
                <p-chart type="bar" [data]="dailyEvents" [options]="dailyEventOptions"></p-chart>
            </mat-tab>
            <mat-tab label="Daily Reports">
                <div>TEST 2</div>
            </mat-tab>
            <mat-tab label="Rule Book">
                <div>TEST 3</div>
            </mat-tab>


        </mat-tab-group>

        <mat-tab-group>
            <mat-tab label="SOD Chart">
            </mat-tab>
            <mat-tab label="Daily Reports">
                <div>TEST 2</div>
            </mat-tab>

        </mat-tab-group>
        <div class="relative z-10">
            <div class="absolute  right-6">
            </div>
        </div>
    </div>
    `,
    encapsulation: ViewEncapsulation.None,
})
export class ACMDashboardComponent implements AfterViewInit, OnInit {
    dailyEvents = {
        labels: "test",
        datasets: [
            {
                label: 'Event',
                data: [],
            },

        ],
    };
    dailyEventOptions = {
        plugins: {
            tooltip: {
                enabled: true, // <-- this option disables tooltips
            },
            legend: {
                display: false,
            },
        },
    };
    isLinear = true;
    public preSelection = { selectedTargetType: 'USER', selectedAnalysisType: 'RULE' };
    public header = "Cross System Analysis";

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
