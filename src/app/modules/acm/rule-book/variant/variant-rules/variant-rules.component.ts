import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSelectChange } from "@angular/material/select";
import { RuleBookService } from "app/backend-api/rule-book.service";
import { FormValidationService } from "app/shared/form-validation.service";
import { NotificationService } from "app/shared/notification.service";
import { ConfirmationService } from "primeng/api";
import { catchError, Subject, takeUntil, tap, throwError } from "rxjs";
import { OnlineRuleDetailComponent } from "app/modules/admin_2/riskAnalysis/online/rules/rule-detail/online-rule-detail.component";
@Component({
  selector: "app-variant-rules",
  templateUrl: "./variant-rules.component.html",
  styleUrls: ["./variant-rules.component.scss"],
})
export class VariantRulesComponent implements OnInit {
  public form: FormGroup;
  private subject = new Subject<boolean>();

  private openDetail(data) {
    this.dailog.open(OnlineRuleDetailComponent, {
      width: "75%",
      height: "750px",
      data: { ruleId: data.id },
    });
  }

  systems: any[];

  favorites = [];
  lazyEvent: any;
  tableOneTitle = "Rules";
  selectedFavoriteId: number;
  tableTwoTitle = "Selected Rules";
  selectedRule: any[] = [];
  mainCols = [
    {
      field: "ruleName",
      type: "text",
      header: "Rule",
      width: 200,
      color: "#008cf0",
      iconClass: "pi-angle-right",
      onClick: (data) => this.openDetail(data),
    },
    { field: "ruleDescription", type: "text", header: "Description" },
    {
      field: "businessProcess",
      type: "text",
      header: "Business Process",
      subField: "name",
    },
    { field: "subProc", type: "text", header: "Sub Process", subField: "name" },
    { field: "ruleType", type: "text", header: "Type", subField: "name" },
  ];
  subCols = [
    {
      field: "ruleName",
      type: "text",
      header: "Rule",
    },
    { field: "ruleDescription", type: "text", header: "Description" },
  ];
  displaySelectionData: any = [];
  selectionMode = "multiple";
  rowsPerPageOptions = [10, 20, 30, 50, 100, 150, 200];
  startingDisplayAmout = 10;
  data: [];
  selectionMode1 = "single";
  description: string = "";
  ruleId: number;
  loading: boolean;
  systemId: number;
  systemTypeId: number;
  totalRecords: number;
  sortOrder = 1;
  sortField: string;
  filter: any;
  first = 0;
  rows = 10;
  selectedOptions: any;
  private encodeParams(params) {
    return encodeURIComponent(params);
  }

  constructor(
    private formBuilder: FormBuilder,
    public dailog: MatDialog,
    private formValidation: FormValidationService,
    private ruleBookService: RuleBookService,
    private notificationService: NotificationService,
    private confirmationService: ConfirmationService
  ) {
    const filter = {
      ruleName: [{ value: null, matchMode: "contains", operator: "and" }],
      description: [{ value: null, matchMode: "contains", operator: "and" }],
      hostName: [{ value: null, matchMode: "contains", operator: "and" }],
      userName: [{ value: null, matchMode: "contains", operator: "and" }],
      clientNumber: [{ value: null, matchMode: "contains", operator: "and" }],
      sysNr: [{ value: null, matchMode: "contains", operator: "and" }],
      languageCode: [{ value: null, matchMode: "contains", operator: "and" }],
      sid: [{ value: null, matchMode: "contains", operator: "and" }],
    };
    this.filter = this.encodeParams(JSON.stringify(filter));
  }

  onRowSelected(selectedRow: any) {
    if (this.selectedRule) {
      this.selectedRule.push(selectedRow.id);
    } else {
      this.selectedRule = [selectedRow.id];
    }
    if (this.displaySelectionData) {
      this.displaySelectionData.push(selectedRow);
    } else {
      this.displaySelectionData = [selectedRow];
    }
    this.ruleId = selectedRow.id;
  }

  onRowUnSelected(unSelectedRow: any) {
    if (this.selectedRule) {
      this.selectedRule = this.selectedRule.filter(
        (item) => item !== unSelectedRow.id
      );
    } else {
      this.selectedRule = [];
    }
    if (this.displaySelectionData) {
      this.displaySelectionData = this.displaySelectionData.filter(
        (item) => item.id !== unSelectedRow.id
      );
    } else {
      this.displaySelectionData = [];
    }
  }

  onSelect(event: MatSelectChange) {}

  private createForm() {
    this.form = this.formBuilder.group({
      description: ["", [Validators.required]],
      system: ["", [Validators.required]],
    });
  }

  private updateForm() {
    this.form = this.formBuilder.group({
      description: [this.description, [Validators.required]],
      system: [this.systemId],
    });
  }

  onClickNew() {
    this.createForm();
  }

  onClickSave() {
    if (this.selectedFavoriteId) {
      const formData = {
        favorateId: this.selectedFavoriteId,
        systemId: this.form.value.system,
        description: this.form.value.description,
        rulesId: this.selectedRule,
      };

      this.ruleBookService
        .saveOrUpdateVariantRule(formData)
        .pipe(
          tap((res) => {
            this.favorites = res.data.favorates;
            this.notificationService.success(
              "Successfully Update Favorite Risk!"
            );
          }),
          catchError((err) => {
            this.formValidation.validateAllFields(this.form, err);
            this.notificationService.error(err.error.message);
            return throwError(() => err);
          }),
          takeUntil(this.subject)
        )
        .subscribe();
    } else {
      const formData = {
        systemId: this.form.value.system,
        description: this.form.value.description,
        rulesId: this.selectedRule,
      };
      this.ruleBookService
        .saveOrUpdateVariantRule(formData)
        .pipe(
          tap((res) => {
            this.favorites = res.data.favorates;
            this.notificationService.success(
              "Successfully Added Favorite Risk!"
            );
          }),
          catchError((err) => {
            this.formValidation.validateAllFields(this.form, err);
            this.notificationService.error(err.error.message);

            return throwError(() => err);
          }),
          takeUntil(this.subject)
        )
        .subscribe();
      this.createForm();
    }
  }

  checkFavoriteSeleted() {
    if (!this.selectedFavoriteId) {
      this.notificationService.error("Please select a Favorite Risk!");
      throw Error("Please select a FavoriteRisk");
    }
  }

  deleteFavorite() {
    this.checkFavoriteSeleted();
    this.confirmationService.confirm({
      message: "Do you want to remove seleted favoriteRisk?",
      accept: () => {
        this.ruleBookService
          .deleteVariantRules(this.selectedFavoriteId)
          .pipe(
            tap((res) => {
              this.favorites = res.data;
              this.notificationService.success(
                "Successfully delete a Favorite Risk!"
              );
              this.selectedFavoriteId = null;
            }),
            catchError((err) => {
              this.notificationService.error(err.error.message);
              return throwError(() => err);
            }),
            takeUntil(this.subject)
          )
          .subscribe();
      },
    });
    this.createForm();
  }

  onClickFavorite(item: any) {
    this.description = item.description;
    this.selectedFavoriteId = item.id;
    this.systemId = item.systemId;
    this.updateForm();
    this.ruleBookService
      .getVariantRisk(item.id)
      .pipe(
        tap((res) => {
          this.displaySelectionData = res.data.rules;
        }),
        catchError((err) => {
          return throwError(() => err);
        }),
        takeUntil(this.subject)
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.loading = true;
    this.sortField = "ruleName";
    this.ruleBookService
      .variantRuleRequiredInfo()
      .pipe(
        tap((res) => {
          this.systems = res.data.saps;
          this.favorites = res.data.favorites;
          this.ruleBookService
            .variantgetRules(
              this.first,
              this.startingDisplayAmout,
              this.sortOrder,
              this.sortField,
              this.filter
            )
            .pipe(
              tap((res) => {
                this.totalRecords = res.data.records;
                this.data = res.data.rows;
                this.loading = false;
              }),
              catchError((err) => {
                return throwError(() => err);
              }),
              takeUntil(this.subject)
            )
            .subscribe();
        }),
        catchError((err) => {
          return throwError(() => err);
        }),
        takeUntil(this.subject)
      )
      .subscribe();

    this.createForm();
  }
}
