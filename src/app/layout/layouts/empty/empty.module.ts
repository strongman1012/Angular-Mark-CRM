import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FuseLoadingBarModule} from '@fuse/components/loading-bar';
import {SharedModule} from 'app/shared/shared.module';
import {EmptyLayoutComponent} from 'app/layout/layouts/empty/empty.component';
import {ToastModule} from 'primeng/toast';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

@NgModule({
  declarations: [
    EmptyLayoutComponent,
  ],
  imports: [
    RouterModule,
    FuseLoadingBarModule,
    SharedModule,
    ToastModule,
    ConfirmDialogModule,
  ],
  exports: [
    EmptyLayoutComponent,
  ],
})
export class EmptyLayoutModule {
}
