import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { catchError, Subject, takeUntil, tap, throwError } from "rxjs";
import { FormValidationService } from "app/shared/form-validation.service";
import { NotificationService } from "app/shared/notification.service";
import { MatSelectChange } from "@angular/material/select";
import { RuleBookService } from "app/backend-api/rule-book.service";

@Component({
  selector: "app-add-rule",
  templateUrl: "./add-rule.component.html",
  styleUrls: ["./add-rule.component.scss"],
})
export class AddRuleComponent implements OnInit, OnDestroy {
  private subject = new Subject<boolean>();
  public form: FormGroup;
  public rule: any;

  ruleTypes = [];
  businessProcess = [];
  businessSubProcess = [];
  systemTypes = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private formValidation: FormValidationService,
    private ruleBookService: RuleBookService,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<AddRuleComponent>
  ) {}

  onSelect(event: MatSelectChange) {
    const subOptions = this.businessProcess.filter(
      (res) => res.id === event.value
    );

    this.businessSubProcess = subOptions[0].subProcesses;
  }
  ngOnInit(): void {
    this.rule = this.dialogData.rule;
    this.businessProcess = this.dialogData.selectedOptions.businessProcesses;
    this.ruleTypes = this.dialogData.selectedOptions.ruleTypes;

    if (this.rule) {
      this.updateForm();
    } else {
      this.createForm();
    }
  }

  private createForm() {
    this.form = this.formBuilder.group({
      ruleName: ["", [Validators.required]],
      ruleDescription: ["", [Validators.required]],
      ruleTypeId: ["", [Validators.required]],
      businessProcessId: ["", [Validators.required]],
      subProcId: ["", [Validators.required]],
      // systemType: [""],
      gdpr: ["false"],
    });
  }

  private updateForm() {
    this.businessSubProcess = this.rule.businessProcess.subProcesses;
    this.form = this.formBuilder.group({
      ruleName: [this.rule.ruleName, [Validators.required]],
      ruleDescription: [this.rule.ruleDescription, [Validators.required]],
      ruleTypeId: [this.rule.ruleType.id, [Validators.required]],
      businessProcessId: [this.rule.businessProcess.id, [Validators.required]],
      subProcId: [
        this.rule.businessProcess.subProcesses[0].id,
        [Validators.required],
      ],
      // systemType: [""],
      gdpr: ["false"],
    });
  }

  createRule() {
    console.log("formValue", this.form.value);
    this.ruleBookService
      .ruleSave(this.form.value)
      .pipe(
        tap((res) => {
          console.log("res", res);
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

  updateRule() {
    const data = { id: this.rule.id, ...this.form.value };
    this.ruleBookService
      .ruleEdit(data)
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

  ngOnDestroy(): void {
    this.subject.next(true);
    this.subject.complete();
  }
}
