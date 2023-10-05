import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Route, RouterModule } from '@angular/router';
import { LogDetailsComponent } from 'app/components/log-details';
import { TableComponent } from 'app/components/tables.component';
import { JobsSection } from './dataSync/dataExtractor/JobsSection';
import { ProfilesSection } from './dataSync/dataExtractor/ProfilesSection';
import { SchedulerSection } from './dataSync/dataExtractor/SchedulerSection';

const routes: Route[] = [
  {
    path: 'data-extractor/profiles',
    component: ProfilesSection
  },
  {
    path: 'data-extractor/jobs',
    component: JobsSection
  },
  {
    path: 'data-extractor/scheduler',
    component: SchedulerSection
  },
]

@NgModule({
  declarations: [
    ProfilesSection,
    JobsSection,
    SchedulerSection
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TableComponent,
    LogDetailsComponent,
    FormsModule
  ],

})
export class DataSyncModule {
}
