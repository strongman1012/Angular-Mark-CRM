import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { TableModule } from 'primeng/table';
import { MultiSelectModule } from 'primeng/multiselect';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from '../../shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PickListModule } from 'primeng/picklist';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { LogSection } from './communication/email/logs/LogSection';
import { TemplateSection } from './communication/template/TemplateSection';
import { LogoSection } from './communication/logo/LogoSection';
import { SettingsSectionComponent } from './communication/email/settings/settings-section.component';
import { DisplayLogoComponent } from 'app/components/display-image';
import { EmailTemplateComponent } from 'app/components/email-template';
import { SelectTemplateComponent } from 'app/components/select-template';
import { UploadImageComponent } from 'app/components/upload-button';
import { TableComponent } from 'app/components/tables.component';
import { FormComponent } from 'app/components/form';
import { ToastModule } from 'primeng/toast';
import { AdminUserService } from '../admin_2/users/admin-user.service';

const routes: Route[] = [
  {
    path: 'email/settings',
    component: SettingsSectionComponent
  },
  {
    path: 'email/logs',
    component: LogSection
  },
  {
    path: 'template',
    component: TemplateSection
  },
  {
    path: 'logo',
    component: LogoSection
  },
]

@NgModule({
  declarations: [
    SettingsSectionComponent,
    LogSection,
    TemplateSection,
    LogoSection,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTabsModule,
    TableModule,
    MultiSelectModule,
    MenuModule,
    ButtonModule,
    CardModule,
    MatDialogModule,

    MatFormFieldModule,
    SharedModule,
    MatInputModule,
    MatSelectModule,
    PickListModule,
    MatButtonModule,
    MatCheckboxModule,

    SelectTemplateComponent,
    EmailTemplateComponent,
    CardModule,
    DisplayLogoComponent,
    UploadImageComponent,
    TableComponent,
    FormComponent,
    ToastModule,
  ],

})
export class CommunicationModule {
}
