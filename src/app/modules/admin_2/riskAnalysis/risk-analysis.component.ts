import {
  AfterViewInit,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {LoadSelectionComponent} from './loadSelection/load-selection.component';
import {
  LoadSelectionService,
} from '../../../backend-api/load-selection.service';

@Component({
  selector: 'risk-analysis',
  templateUrl: './risk-analysis.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class RiskAnalysisComponent implements AfterViewInit, OnInit {

  isLinear = true;

  /**
   * Constructor
   */
  constructor(
      private _formBuilder: FormBuilder,
      public dialog: MatDialog,
      private _loadSelectionService: LoadSelectionService) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.openDialog();
  }

  openDialog() {
    const dialogRef = this.dialog.open(LoadSelectionComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
