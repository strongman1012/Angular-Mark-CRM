import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { RuleBookService } from "app/backend-api/rule-book.service";
import { NotificationService } from "app/shared/notification.service";
import { catchError, Subject, takeUntil, tap, throwError } from "rxjs";

@Component({
  selector: "app-rule-search",
  templateUrl: "./rule-search.component.html",
  styleUrls: ["./rule-search.component.scss"],
})
export class RuleSearchComponent implements OnInit {
  private subject = new Subject<boolean>();
  public form: FormGroup;
  formRules: FormGroup[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private fb: FormBuilder,
    private ruleBookService: RuleBookService,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<RuleSearchComponent>
  ) {}

  public options: any[] = [
    { id: 1, name: "all" },
    { id: 2, name: "any" },
  ];

  public dataHeaders: any[] = [
    { id: 1, name: "Rule" },
    { id: 2, name: "Description" },
    { id: 3, name: "Business Process" },
    { id: 4, name: "Sub Process" },
    { id: 5, name: "Type" },
    { id: 6, name: "System Type" },
  ];

  public conditions: any[] = [
    { id: 1, name: "contains" },
    { id: 2, name: "begins with" },
    { id: 3, name: "ends with" },
    { id: 4, name: "equal" },
  ];

  ngOnInit(): void {
    // this.initFormGroup();
    this.initAddFormGroup();
  }

  initFormGroup() {
    return this.fb.group({
      dataHeader: [1, Validators.required],
      condition: [1, Validators.required],
      searchValue: [""],
    });
  }

  initAddFormGroup() {
    this.form = this.fb.group({
      option: [1, Validators.required],
      addForms: this.fb.array([this.initFormGroup()]),
    });
    if (this.form) {
      this.formRules = this.form.get("addForms")["controls"];
    }
  }

  addForm() {
    const control = <FormArray>this.form.controls["addForms"];
    control.push(this.initFormGroup());
    this.formRules = this.form.get("addForms")["controls"];
  }

  removeForm(index: number) {
    const control = <FormArray>this.form.controls["addForms"];
    control.removeAt(index);
    this.formRules = this.form.get("addForms")["controls"];
  }

  reset() {
    this.initAddFormGroup();
  }

  getFormData() {
    const formArray = this.form.get("addForms") as FormArray;
    const formValues = formArray.controls.map((control) => control.value);
    console.log("formValues", formValues);
  }
  find() {
    this.getFormData();
  }

  ngOnDestroy(): void {
    this.subject.next(true);
    this.subject.complete();
  }
}
