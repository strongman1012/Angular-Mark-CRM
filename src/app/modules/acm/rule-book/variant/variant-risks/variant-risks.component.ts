import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatSelectChange } from "@angular/material/select";
import { RuleBookService } from "app/backend-api/rule-book.service";
import { FormValidationService } from "app/shared/form-validation.service";
import { NotificationService } from "app/shared/notification.service";
import { ConfirmationService } from "primeng/api";
import { catchError, Subject, takeUntil, tap, throwError } from "rxjs";
import { RiskDetailsComponent } from "../../risks/risk-details/risk-details.component";

@Component({
  selector: "app-variant-risks",
  templateUrl: "./variant-risks.component.html",
  styleUrls: ["./variant-risks.component.scss"],
})
export class VariantRisksComponent implements OnInit {
  public form: FormGroup;
  private subject = new Subject<boolean>();

  private openDetail(data) {
    this.dailog.open(RiskDetailsComponent, {
      width: "75%",
      height: "750px",
      data: { riskId: data.id },
    });
  }

  systemTypes = [
    { name: "SAP", id: 1 },
    { name: "HANA_DATABASE", id: 2 },
    { name: "BOBJ", id: 3 },
    { name: "SUCCESS_FACTORS", id: 4 },
    { name: "SPLUNK", id: 5 },
  ];
  systems: any[];
  favorites = [];
  lazyEvent: any;
  tableOneTitle = "Risks";
  selectedFavoriteId: number;
  tableTwoTitle = "Selected Risks";
  selectedRisk: any = [303];
  mainCols = [
    {
      field: "name",
      type: "text",
      header: "Risk ID",
      width: 200,
      color: "#008cf0",
      iconClass: "pi-angle-right",
      onClick: (data) => this.openDetail(data),
    },
    { field: "riskDescription", type: "text", header: "Description" },
    {
      field: "businessProcess",
      type: "text",
      header: "Business Process",
      subField: "name",
    },
    { field: "subProc", type: "text", header: "Sub Process", subField: "name" },
    { field: "riskType", type: "text", header: "Type", subField: "name" },
    {
      field: "enabled",
      type: "boolean",
      header: "Enabled",
    },
  ];
  subCols = [
    {
      field: "name",
      type: "text",
      header: "Risk ID",
    },
    { field: "riskDescription", type: "text", header: "Description" },
  ];
  displaySelectionData: any = [];
  selectionMode = "multiple";
  rowsPerPageOptions = [10, 20, 30, 50, 100, 150, 200];
  startingDisplayAmout = 10;
  data: [];
  selectionMode1 = "single";
  description: string = "";
  riskId: number;
  loading: boolean;
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
      name: [{ value: null, matchMode: "contains", operator: "and" }],
      riskDescription: [
        { value: null, matchMode: "contains", operator: "and" },
      ],
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
    console.log("this.selectedRisk", this.selectedRisk);
    if (this.selectedRisk) {
      this.selectedRisk.push(selectedRow.id);
    } else {
      this.selectedRisk = [selectedRow.id];
    }
    if (this.displaySelectionData) {
      this.displaySelectionData.push(selectedRow);
    } else {
      this.displaySelectionData = [selectedRow];
    }
    this.riskId = selectedRow.id;
  }

  onRowUnSelected(unSelectedRow: any) {
    if (this.selectedRisk) {
      this.selectedRisk = this.selectedRisk.filter(
        (item) => item !== unSelectedRow.id
      );
    } else {
      this.selectedRisk = [];
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
      systemType: [1],
      system: ["", [Validators.required]],
    });
  }

  private updateForm() {
    this.form = this.formBuilder.group({
      description: [this.description, [Validators.required]],
      systemType: [this.systemTypeId, [Validators.required]],
      system: [""],
    });
  }

  onClickNew() {
    this.createForm();
  }

  onClickSave() {
    if (this.selectedFavoriteId) {
      const formData = {
        favorateId: this.selectedFavoriteId,
        systemId: this.form.value.systemType,
        description: this.form.value.description,
        risksId: this.selectedRisk,
      };

      this.ruleBookService
        .saveOrUpdateVariantRisk(formData)
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
        systemId: this.form.value.systemType,
        description: this.form.value.description,
        risksId: this.selectedRisk,
      };
      this.ruleBookService
        .saveOrUpdateVariantRisk(formData)
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
    console.log("selectedNull");
    this.confirmationService.confirm({
      message: "Do you want to remove seleted favoriteRisk?",
      accept: () => {
        this.ruleBookService
          .deleteVariantRisk(this.selectedFavoriteId)
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
    this.systemTypeId = item.systemId;
    this.updateForm();
    this.ruleBookService
      .getVariantRisk(item.id)
      .pipe(
        tap((res) => {
          this.displaySelectionData = res.data.risks;
        }),
        catchError((err) => {
          return throwError(() => err);
        }),
        takeUntil(this.subject)
      )
      .subscribe();
  }

  ngOnInit(): void {
    this.sortField = "name";
    this.loading = true;
    this.ruleBookService
      .variantRiskRequiredInfo()
      .pipe(
        tap((res) => {
          this.systems = res.data.saps;
          this.favorites = res.data.favorites;
          this.ruleBookService
            .VariantgetRisks(
              this.first,
              this.startingDisplayAmout,
              this.sortOrder,
              this.sortField,
              this.filter
            )
            .pipe(
              tap((res) => {
                this.data = res.data.rows;
                this.totalRecords = res.data.records;
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
