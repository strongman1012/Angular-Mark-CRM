import { CommonModule } from '@angular/common';
import {
    AfterViewInit,
    Component,
    OnInit,
    ViewEncapsulation,
  } from '@angular/core';
  import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { BackendApiModule } from 'app/backend-api/backend-api.module';
import { PreSelectionComponent } from 'app/modules/acm/riskAnalysis/online/pre-selection/pre-selection.component';
import { UsersModule } from 'app/modules/admin_2/riskAnalysis/users/users.module';
import { SharedModule } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { OnlineRiskListComponent } from './online-risk-list.component';
import { OnlineRoleListComponent } from './online-role-list.component';
import { OnlineRuleListComponent } from './online-rule-list.component';
import { OnlineUserListComponent } from './online-user-list.component';
  
  @Component({
    standalone: true,
    selector: 'process-form-template',
    template: `
    <div class="flex flex-col flex-auto min-w-0">

    <!-- Main -->
    <div class="flex-auto p-6 sm:p-10 ">
        <ng-content></ng-content>
    </div>

    </div>
    `,
    encapsulation: ViewEncapsulation.None,
    imports: [
        MatStepperModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatPaginatorModule,
        MatTableModule,
        MatDialogModule,
        BackendApiModule,
        MatSelectModule,
        MatIconModule,
        CommonModule,
        MatCheckboxModule,
        MatMenuModule,
        MatRippleModule,
        MatProgressSpinnerModule,
        UsersModule,
        MatTabsModule,
        MenuModule,
        SharedModule,
        ButtonModule,
        TableModule,
        
    ]
  })
  export class ProcessFormTemplate implements AfterViewInit, OnInit {
  
    isLinear = true;
    public preSelection= {selectedTargetType: 'USER',selectedAnalysisType:'RULE'};
  
    /**
     * Constructor
     */
    constructor(
        private _formBuilder: FormBuilder,
        public dialog: MatDialog
       ) {
    }
  
    ngOnInit(): void {
    }
  
    ngAfterViewInit() {
      this.openDialog();
    }
  
    openDialog() {
      const dialogRef = this.dialog.open(PreSelectionComponent);
  
      dialogRef.afterClosed().subscribe((result) => {
        console.log('after', result.preSelection)
        this.preSelection= result.preSelection;
      });
    }
  }
  