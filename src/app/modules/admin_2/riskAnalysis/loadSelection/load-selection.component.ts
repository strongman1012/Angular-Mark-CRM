import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {
  LoadSelectionService,
} from '../../../../backend-api/load-selection.service';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'load-selection',
  templateUrl: './load-selection.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class LoadSelectionComponent implements OnInit {
  private alert: { type: string; message: string };
  private showAlert: boolean = false;
  loadSelectionForm: FormGroup;
  public reportingUnit;

  /**
   * Constructor
   */
  constructor(
      private _loadSelectionService: LoadSelectionService,
      private _formBuilder: FormBuilder,
      private dialogRef: MatDialogRef<LoadSelectionComponent>) {
  }

  ngOnInit(): void {
    this.reportingUnit = {
      sapSystemList: [],
      analysisTargetList: [],
      analysisTypeList: [],
      otherOptions: [],
    };
    this.loadSelectionForm = this._formBuilder.group({
          sapSystemId: ['', Validators.required],
          target: ['', Validators.required],
          analysisType: ['', Validators.required],
          checkboxes: this._formBuilder.group({}),
        },
    );
    this.loadSelection();

  }

  loadSelection() {
    this._loadSelectionService.loadSelection().subscribe({
      next: (reportingUnit) => {
        this.reportingUnit = reportingUnit;
        this.showAlert = false;
        this.initForm();
      },
      error: (response) => {
        this.alert = {
          type: 'error',
          message: 'Wrong email or password',
        };
        // Show the alert
        this.showAlert = true;
      },
    });

  }

  private initForm() {
    const checkboxes = this.loadSelectionForm.get('checkboxes') as FormGroup;
    this.reportingUnit.otherOptions.forEach((option: any) => {
      checkboxes.addControl(option.id + '-' + option.name,
          new FormControl(true));
    });

  }

  next() {
    if (this.loadSelectionForm.invalid) {
      return;
    }

    localStorage.setItem('sapSystemId',
        this.loadSelectionForm.get('sapSystemId').value);
    localStorage.setItem('target', this.loadSelectionForm.get('target').value);
    localStorage.setItem('analysisType',
        this.loadSelectionForm.get('analysisType').value);
    localStorage.setItem('otherOptions', this.selectedOptions);
    console.log('AdHoc PreSelection is done.');
    this.dialogRef.close();
  }

  get selectedOptions() { // right now: ['1','3']
    return Object.entries(this.loadSelectionForm.get('checkboxes').value).
        filter(function(value) {
          return value[1] === true;
        }).
        map(function(value) {
          return value[0].split('-')[0];
        }).
        join(',');
  }
}
