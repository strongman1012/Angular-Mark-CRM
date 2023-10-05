import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { LogDetailsComponent } from 'app/components/log-details';
import { TableComponent } from 'app/components/tables.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';
import { ClearLogsSection } from './eventViewer/clearLogs/ClearLogsSection';
import { EventLogSection } from './eventViewer/logs/EventLogSection';

const routes: Route[] = [
  {
    path: 'logs',
    component: EventLogSection
  },
  {
    path: 'clear-logs',
    component: ClearLogsSection
  },
]

@NgModule({
  declarations: [
    EventLogSection,
    ClearLogsSection
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableComponent,
    LogDetailsComponent,
    FormsModule,
    CardModule,
    DividerModule,
    InputNumberModule,
    ButtonModule
  ],

})
export class EventViewerModule {
}
