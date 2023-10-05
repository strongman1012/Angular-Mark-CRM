import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'risk-analysis',
  template: `
  <section class="w-full">
    <process-form-template>
    <!-- CONTENT GOES HERE -->
        <mat-stepper [linear]="isLinear" #stepper class="rounded-2xl">
            <mat-step>
                <div>
                    <ng-template matStepLabel>Step 1</ng-template>
                    <online-users [header]="header" [preSelection]="preSelection"
                                  *ngIf="preSelection.selectedTargetType==='USER'"></online-users>
                    <online-roles [preSelection]="preSelection"
                                  *ngIf="preSelection.selectedTargetType==='ROLE'"></online-roles>
                    <div>
                        <button mat-flat-button matStepperNext [color]="'primary'" class="mt-3">Next</button>
                    </div>
                </div>
            </mat-step>
            <mat-step label="Step 2">
                <div>
                    <online-rule-list [preSelection]="preSelection"
                                      *ngIf="preSelection.selectedAnalysisType==='RULE'"></online-rule-list>
                    <online-risk-list [preSelection]="preSelection"
                                      *ngIf="preSelection.selectedAnalysisType==='RISK'"></online-risk-list>
                    <div class="mt-3">
                        <button mat-button matStepperPrevious>Back</button>
                        <button mat-flat-button matStepperNext [color]="'primary'">Next</button>
                    </div>
                </div>


            </mat-step>
            <mat-step>
                <ng-template matStepLabel>Step 3</ng-template>
                <div class="mt-3">
                    <button mat-button matStepperPrevious>Back</button>
                    <button mat-flat-button (click)="stepper.reset()">Reset</button>
                </div>
            </mat-step>
            
        </mat-stepper>
    </process-form-template>
  </section>
  `,
//   encapsulation: ViewEncapsulation.None,
})
export class RiskAnalysisOnlineComponent implements AfterViewInit, OnInit {


  isLinear = true;
  public preSelection= {selectedTargetType: 'USER',selectedAnalysisType:'RULE'};
  public header = "Online Analysis";

  /**
   * Constructor
   */
  constructor(
      private _formBuilder: FormBuilder,
      public dialog: MatDialog
  ) {

  }

    ngOnInit(): void {
      console.log('preSelection', this.preSelection)
  }

  ngAfterViewInit() {
  }

  openDialog() {
  }
}
