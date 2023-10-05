import {
  AfterViewInit,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {PreSelectionComponent} from './pre-selection/pre-selection.component';


@Component({
  selector: 'risk-analysis',
  templateUrl: './risk-analysis-online.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class RiskAnalysisOnlineComponent implements AfterViewInit, OnInit {

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
      this.preSelection= result.preSelection;
    });
  }
}
