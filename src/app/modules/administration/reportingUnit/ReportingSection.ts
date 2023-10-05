import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActionFormComponent } from 'app/components/action-form';
import { TableComponent } from 'app/components/tables.component';
import { ChartModule } from 'primeng/chart';


@Component({
    standalone: true,
    selector: 'reporting-section',
    template: `
    <section class="flex w-full flex-col mt-10">
        <div class="flex flex-wrap flex-row card mt-5 mx-10">
            <div class="shadow-md w-1/4">
                <h5>User Login Events for past 10 days</h5>
                <p-chart type="bar" [responsive]="true" width="200" height="150" class="flex w-3/12 mt"  [data]="basicData" [options]="basicOptions">
                </p-chart>
            </div>
            <div class="shadow-md w-1/4">
                <h5>No of Users Per RU</h5>
                <p-chart type="doughnut" [responsive]="true" width="200" height="150" class="flex w-3/12 mt"  [data]="basicData" [options]="basicOptions">
                </p-chart>
            </div>
            <div class="shadow-md w-1/4">
                <h5>No of Systems Per RU</h5>
                <p-chart type="doughnut" [responsive]="true" width="200" height="150" class="flex w-3/12 mt"  [data]="basicData" [options]="basicOptions">
                </p-chart>
            </div>
            <div class="shadow-md w-1/4">
                <h5>No of Active/Disabled Users</h5>
                <p-chart type="doughnut" [responsive]="true" width="200" height="150" class="flex w-3/12 mt"  [data]="basicData" [options]="basicOptions">
                </p-chart>
            </div>
        </div>
        <app-table [(showDialog)]=showDialog [cols]=cols [data]=data title={{tableTitle}}></app-table> 
    </section>
    `,
    styles: [`  
        :host {
            width: 100%;
        }
    `],
    imports: [
        ChartModule,
        TableComponent
    ]
})
export class ReportingSection implements OnInit, OnDestroy {
    cols = [
        { field: 'name', type: 'text', header: 'Name' },
        { field: 'systems', type: 'text', header: 'Systems' },
        { field: 'database', type: 'text', header: 'Database' },
        { field: 'database-url', type: 'text', header: 'Database URL' },
        { field: 'notification-scope', type: 'text', header: 'Notification Scope' },
    ];

    data = [
        {
            profile: 'type',
            status: 'text',
            'started-on': 'Type',
            'completed-on': 'Type',
            'percentage-completion': 'Type'
        },
    ]
    title = 'Data Extraction Jobs';
    basicOptions = {
        legend: { display: false },
        plugins: {
            legend: {
                display: false,
                labels: {
                    color: '#ebedef'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    display: false,
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(255,255,255,0.2)'
                }
            },
            y: {
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(255,255,255,0.2)'
                }
            }
        }
    };
    basicData = {

        labels: ['January', 'February', 'March', 'April', 'May', 'June', '09-01', '10 Jan'],
        datasets: [
            {
                label: 'My First dataset',
                backgroundColor: [
                    '#42A5F5',
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56"
                ],
                data: [65, 59, 80, 81, 56, 55, 40, 99, 98, 9, 80]
            }
        ]
    };

    rows = [
        {
            title: 'Host',
            id: 'host',
            placeHolder: 'Host'
        },
        {
            title: 'Port',
            id: 'port',
            placeHolder: 'Port'
        },
        {
            title: 'Auth type',
            id: 'authType',
            placeHolder: 'Auth type'
        },
        {
            title: 'Username',
            id: 'username',
            placeHolder: 'Username'
        },
        {
            title: 'Password',
            id: 'password',
            placeHolder: '**************'
        },
        {
            title: 'Sender',
            id: 'sender',
            placeHolder: 'Sender'
        }
    ]

    buttons = [
        {
            title: 'Test'
        },
        {
            title: 'Test Message'
        },
        {
            title: 'Save'
        }

    ]
    tableTitle = 'Reporting Units';

    constructor(private userDialog: MatDialog) {

    }

    ngOnInit(): void {

    }

    ngAfterViewInit(): void {

    }

    ngOnDestroy(): void {
    }

    showDialog(event): void {
        console.log("show dialog")
        const  dialogRef = this.userDialog.open(ActionFormComponent, {data: {user:{}}});

        dialogRef.afterClosed().subscribe((result) => {
            console.log(`Dialog result: ${result}`);
            if (result) {
                // this.loadCars();
                // this.selectedUser = null;
            }
        });
    }
}
