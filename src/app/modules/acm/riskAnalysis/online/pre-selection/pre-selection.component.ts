import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {Subject, takeUntil, tap} from 'rxjs';
import {RiskAnalysisOnlineService} from '../risk-analysis-online.service';
import {KeyValue} from '@angular/common';

@Component({
  selector: 'pre-selection',
  templateUrl: './pre-selection.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class PreSelectionComponent implements OnInit, OnDestroy {
  private alert: { type: string; message: string; };
  private showAlert: boolean = false;
  loadSelectionForm: FormGroup;
  public reportingUnit;
  private subject = new Subject<boolean>();
  variants: any = [];
  otherOptions: Array<KeyValue<string, string>> = [
    {key: 'excludeInactive', value: 'Exclude Inactive Users'},
    {key: 'excludeUnassigned', value: 'Exclude Users without any Roles'},
    {key: 'includeMitigations', value: 'Excluded Mitigated Users'},
    {key: 'orgFieldCheck', value: 'Perform Analysis on Org Fields'},
  ];

  /**
   * Constructor
   */
  constructor(
      private apiService: RiskAnalysisOnlineService,
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<PreSelectionComponent>) {
  }

  ngOnDestroy(): void {
    this.subject.next(true);
    this.subject.complete();
  }

  ngOnInit(): void {
    this.reportingUnit = {
      sapSystemList: [],
      analysisTargetList: [],
      analysisTypeList: [],
      otherOptions: [],
    };
    this.loadSelectionForm = this.fb.group({
          sapSystemId: ['', Validators.required],
          analysisTarget: ['', Validators.required],
          analysisType: ['', Validators.required],
          favorites: [''],
          excludeInactive: [true],
          excludeUnassigned: [true],
          includeMitigations: [true],
          orgFieldCheck: [true],
        },
    );
    this.loadSelection();

  }

  get optionsFormArray() {
    return this.loadSelectionForm.controls.options as FormArray;
  }

  loadSelection() {

    this.apiService.loadSelection().pipe(
        tap((apiResponse) => {
          this.reportingUnit = apiResponse.data;
          this.showAlert = false;
        }),
        takeUntil(this.subject),
    ).subscribe();
  }

  next() {
    if (this.loadSelectionForm.invalid) {
      return;
    }
    const data = this.loadSelectionForm.value;
    data.favorites = data.favorites.join();
    this.apiService.savePreselection(this.loadSelectionForm.value).pipe(
      tap((apiResponse) => {
          console.log('preSelection', apiResponse.data)
          this.dialogRef.close({preSelection: apiResponse.data});
        }),
        takeUntil(this.subject),
    ).subscribe();
  }

  initFavorites() {
    const sapSystemId = this.loadSelectionForm.get('sapSystemId').value;
    let analysisType = this.loadSelectionForm.get('analysisType').value;
    if (analysisType == null || analysisType === '' || analysisType !==
        'Risks') {
      analysisType = false;
    } else {
      analysisType = true;
    }

    this.apiService.findFavorites(sapSystemId, analysisType).pipe(
        tap((apiResponse) => {
          this.variants = apiResponse.data;
        }),
        takeUntil(this.subject),
    ).subscribe();
  }
}
