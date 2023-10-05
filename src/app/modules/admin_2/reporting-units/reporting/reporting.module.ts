import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Route, RouterModule} from '@angular/router';
import {ReportingComponent} from './reporting.component';
import {TableModule} from 'primeng/table';
import {MultiSelectModule} from 'primeng/multiselect';
import {MenuModule} from 'primeng/menu';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {
  ReportingDetailComponent,
} from './reporting-detail/reporting-detail.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {ChartModule} from 'primeng/chart';
import {AddReportingComponent} from './add-reporting/add-reporting.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {SharedModule} from '../../../../shared/shared.module';
import {MatInputModule} from '@angular/material/input';
import {StepsModule} from 'primeng/steps';
import {MatStepperModule} from '@angular/material/stepper';
import {PickListModule} from 'primeng/picklist';
import {
  EditReportingComponent,
} from './edit-reporting/edit-reporting.component';

const routes: Route[] = [
  {
    path: '',
    component: ReportingComponent,
  },
  {
    path: 'add',
    component: AddReportingComponent,
  },
  {
    path: 'edit',
    component: EditReportingComponent,
  },
];

@NgModule({
  declarations: [
    ReportingComponent,
    ReportingDetailComponent,
    AddReportingComponent,
    EditReportingComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TableModule,
    MultiSelectModule,
    MenuModule,
    FormsModule,
    ButtonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    ChartModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    SharedModule,
    MatInputModule,
    StepsModule,
    MatStepperModule,
    PickListModule,
  ],
})
export class ReportingModule {
}
