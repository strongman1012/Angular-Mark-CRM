import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { RuleBookService } from "app/backend-api/rule-book.service";
import { FormValidationService } from "app/shared/form-validation.service";
import { NotificationService } from "app/shared/notification.service";
import { catchError, Subject, takeUntil, tap, throwError } from "rxjs";
import { MatSelectChange } from "@angular/material/select";

@Component({
  selector: "app-add-risks",
  templateUrl: "./add-risks.component.html",
  styleUrls: ["./add-risks.component.scss"],
})
export class AddRisksComponent implements OnInit, OnDestroy {
  private subject = new Subject<boolean>();
  public form: FormGroup;
  public risk: any;

  riskTypes = [];
  crossSystems = [];
  systemTypes = [];
  businessProcess = [];
  businessSubProcess = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private formValidation: FormValidationService,
    public ruleBookService: RuleBookService,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<AddRisksComponent>
  ) {}

  ngOnInit(): void {
    this.risk = this.dialogData.risk;
    this.businessProcess = this.dialogData.selectedOptions.businessProcesses;
    this.riskTypes = this.dialogData.selectedOptions.riskTypes;

    if (this.risk) {
      this.updateForm();
    } else {
      this.createForm();
    }
  }

  onSelect(event: MatSelectChange) {
    const subOptions = this.businessProcess.filter(
      (res) => res.id === event.value
    );

    this.businessSubProcess = subOptions[0].subProcesses;
  }

  private createForm() {
    this.form = this.formBuilder.group({
      name: ["", [Validators.required]],
      riskDescription: ["", [Validators.required]],
      riskTypeId: ["", [Validators.required]],
      businessProcessId: ["", [Validators.required]],
      crossSystem: ["false"],
      subProcId: ["", [Validators.required]],
      detailDesc: ["", [Validators.required]],
      // systemType: [""],
    });
  }

  private updateForm() {
    this.businessSubProcess = this.risk.businessProcess.subProcesses;
    this.form = this.formBuilder.group({
      name: [this.risk.name, [Validators.required]],
      riskDescription: [this.risk.riskDescription],
      riskTypeId: [this.risk.riskTypeId, [Validators.required]],
      businessProcessId: [this.risk.businessProcessId, [Validators.required]],
      crossSystem: [`${this.risk.crossSystem}`],
      subProcId: [this.risk.subProcId, [Validators.required]],
      detailDesc: [this.risk.detailDesc],
      // systemType: [""],
    });
  }

  createRisk() {
    this.ruleBookService
      .riskSave(this.form.value)
      .pipe(
        tap((res) => {
          this.notificationService.show(res);
          this.dialogRef.close(true);
        }),
        catchError((err) => {
          this.notificationService.error(err.error.message);
          return throwError(() => err);
        }),
        takeUntil(this.subject)
      )
      .subscribe();
  }
  updateRisk() {
    const data = { id: this.risk.id, ...this.form.value };
    console.log("data", data);
    this.ruleBookService
      .riskEdit(data)
      .pipe(
        tap((res) => {
          this.notificationService.show(res);
          this.dialogRef.close(true);
        }),
        catchError((err) => {
          console.log("err", err);
          // this.notificationService.error(err.error.message);
          return throwError(() => err);
        }),
        takeUntil(this.subject)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subject.next(true);
    this.subject.complete();
  }
}
