import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {APIInterceptor} from './api.interceptor';
import {LoadSelectionService} from './load-selection.service';


@NgModule({
    providers: [
        LoadSelectionService,
        {provide: HTTP_INTERCEPTORS, useClass: APIInterceptor, multi: true}
    ]
})
export class BackendApiModule {
}
