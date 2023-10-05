import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormComponent } from 'app/components/form';
import { AdminUserService } from 'app/modules/administration/users/admin-user.service';
import { ToastModule } from 'primeng/toast';
import { Subject, takeUntil, tap } from 'rxjs';
import { NotificationService } from '../../../../../shared/notification.service';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'communication',
    template: `
    <app-form [loading]=loading [onSubmit]=onSubmit [rows]=fields [data]=data [buttons]=buttons [getPlaceholderOrDefault]=getPlaceholderOrDefault\> 
    <p-toast></p-toast>
    <router-outlet></router-outlet>
    `,
    styles: [`  
        :host {
            width: 100%;
        }
    `],
})
export class SettingsSectionComponent implements OnInit, OnDestroy {
    loading: string;
    activeButton: string;
    private subject = new Subject<boolean>();
    fields = {
        ehost: {
            title: 'Host',
            id: 'host',
            placeHolder: 'Host'
        },
        eport: {
            title: 'Port',
            id: 'port',
            placeHolder: 'Port'
        },
        eauthtype: {
            title: 'Auth type',
            id: 'authType',
            placeHolder: 'Auth type'
        },
        eusername: {
            title: 'Username',
            id: 'username',
            placeHolder: 'Username'
        },
        epassword: {
            title: 'Password',
            id: 'password',
            placeHolder: '**************'
        },
        esender: {
            title: 'Sender',
            id: 'sender',
            placeHolder: 'Sender'
        }
    }
    data: any;
    buttons = [
        {
            title: 'Test',
            type: 'button',
            buttonFunc: (event) => this.onTest(event)
        },
        {
            title: 'Test Message',
            type: 'button',
            buttonFunc: (event) => this.onTestMessage(event)
        },
        {
            title: 'Save',
            type: 'submit'
        }
    ]
    title = 'communication test';

    constructor(private userService: AdminUserService, private notificationService: NotificationService) {

    }

    ngOnInit(): void {
        this.data = {};
        this.loadData();
        console.log('fields' + this.fields)
    }

    public loadData() {
        setTimeout(() => {
            this.userService.getMailForm().pipe(
                tap((apiResponse) => {
                    console.log(apiResponse.data.mail);
                    // this.users = apiResponse.data.rows;
                    this.data = apiResponse.data.mailInfo
                    console.log(this.data)
                }),
                takeUntil(this.subject)
            ).subscribe();
        }, 10);
    }

    getPlaceholderOrDefault = (id): string => {
        if (id == 'epassword')
            return '*************'
        return this.data[id];
    }

    onSubmit = (formData): void => {
        this.loading = 'Save';
        setTimeout(()=>{  
            this.notificationService.success('Smtp settings was saved successful');
            this.loading = '';

        }, 1000)
    }

    onTest = (event): void => {
        this.loading = 'Test';
        setTimeout(()=>{  
            this.notificationService.success('Smtp settings was saved successful');
            this.loading = '';

        }, 1000)
    }

    onTestMessage = (event): void => {
        this.loading = 'Test Message';
        setTimeout(()=>{  
            this.notificationService.success('Test message was queued to send successful');
            this.loading = '';

        }, 1000)
    }
    ngAfterViewInit(): void {

    }

    ngOnDestroy(): void {
    }
}
