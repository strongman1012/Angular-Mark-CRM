import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { RuleBookService } from "app/backend-api/rule-book.service";
import { FormValidationService } from "app/shared/form-validation.service";
import { NotificationService } from "app/shared/notification.service";
import { catchError, Subject, takeUntil, tap, throwError } from "rxjs";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.scss"],
})
export class FilterComponent implements OnInit {
  private subject = new Subject<boolean>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<FilterComponent>,
    private ruleBookService: RuleBookService,
    private formValidation: FormValidationService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {}
}
