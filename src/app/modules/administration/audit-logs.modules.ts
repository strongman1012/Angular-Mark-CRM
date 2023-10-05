import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { LogDetailsComponent } from 'app/components/log-details';
import { TableComponent } from 'app/components/tables.component';
import { AuditLogs } from './auditLogs/AuditLogs';

const routes: Route[] = [
  {
    path: '',
    component: AuditLogs
  }
]

@NgModule({
  declarations: [
    AuditLogs
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableComponent,
  ],

})
export class AuditLogsModule {
}
