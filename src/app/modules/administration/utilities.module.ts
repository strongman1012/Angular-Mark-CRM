import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { EmailTemplateComponent } from 'app/components/email-template';
import { SelectTemplateComponent } from 'app/components/select-template';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { FileUploadModule } from 'primeng/fileupload';
import { ApplicationConfigSection } from './settings/applicationConfig/ApplicationConfigSection';
import { AuditLogs } from './settings/applicationConfig/AuditLogs';
import { CsiQuerySection } from './utilities/ruleConversion/CsiQuerySection';
import { GrcRulesetSection } from './utilities/ruleConversion/GrcRulesetSection';

const routes: Route[] = [
  {
    path: 'ruleset-conversion/grc-ruleset',
    component: GrcRulesetSection
  },
  {
    path: 'ruleset-conversion/csi-query',
    component: CsiQuerySection
  }
]

@NgModule({
  declarations: [
    GrcRulesetSection,
    CsiQuerySection
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SelectTemplateComponent,
    EmailTemplateComponent,
    CardModule,
    ButtonModule,
    CommonModule,
    FileUploadModule,
  ],

})
export class UtilitiesModule {
}
