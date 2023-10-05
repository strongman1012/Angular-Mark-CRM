import { Component, Inject, OnInit } from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatSelectChange } from "@angular/material/select";
import { RuleBookService } from "app/backend-api/rule-book.service";
import { OnlineRuleDetailComponent } from "app/modules/admin_2/riskAnalysis/online/rules/rule-detail/online-rule-detail.component";
import { NotificationService } from "app/shared/notification.service";
import { forEach } from "lodash";
import { catchError, Subject, takeUntil, tap, throwError } from "rxjs";

@Component({
  selector: "app-add-rules-to-risk",
  templateUrl: "./add-rules-to-risk.component.html",
  styleUrls: ["./add-rules-to-risk.component.scss"],
})
export class AddRulesToRiskComponent implements OnInit {
  private subject = new Subject<boolean>();

  title: string;
  rowsPerPageOptions = [10, 20, 30, 50, 100, 150, 200];
  startingDisplayAmout = 10;
  selectionMode = "multiple";
  availableData: any[];
  selectedData: any[];
  selectedAvailable: boolean;
  selectedRemove: boolean;
  availableSelectedRules: number[];
  selectedRules: number[];
  removeRules: number[];
  riskId: number;
  loading: boolean;
  riskCondition = [
    { id: 1, name: "Join all by OR" },
    { id: 2, name: "Join all by AND" },
    { id: 3, name: "Other" },
  ];
  rcSelection: string;
  disabled = true;
  selectedValue = 1;
  crossSystemMap: {};
  scrollHeight = "250px";
  lazyEvent: any;
  mainCols = [
    {
      field: "ruleName",
      type: "text",
      header: "Rule ID",
      color: "#008cf0",
      iconClass: "pi-angle-right",
      onClick: (data) => this.openRuleDetail(data),
    },
    { field: "ruleDescription", type: "text", header: "Description" },
    {
      field: "businessProcess",
      type: "text",
      header: "Business Process",
      subField: "name",
    },
    { field: "subProc", type: "text", header: "Sub Process", subField: "name" },
    { field: "ruleType", type: "text", header: "Rule Type", subField: "name" },
  ];

  private encodeParams(params) {
    return encodeURIComponent(params);
  }

  private checkSelectedAvailable() {
    if (!this.selectedAvailable) {
      this.notificationService.error("Please select a availableItem.");
      throw Error("Please select a availableItem");
    }
  }

  private checkSelectedRemove() {
    if (!this.selectedRemove) {
      this.notificationService.error("Please select a removeItem");
      throw Error("Please select a removeItem");
    }
  }

  private openRuleDetail(data) {
    this.dialog.open(OnlineRuleDetailComponent, {
      width: "60%",
      height: "750px",
      data: { ruleId: data.id },
    });
  }

  onAvailableRowSelected(selectedRow: any) {
    this.selectedAvailable = true;
    const id: number = selectedRow.id;
    if (this.selectedRules) {
      this.selectedRules.push(id);
    } else {
      this.selectedRules = [id];
    }
  }

  onAvailableRowUnSelected(unSelectedRow: any) {
    this.selectedAvailable = false;
    this.selectedRules = this.selectedRules.filter(
      (item) => item !== unSelectedRow.id
    );
  }

  onSelectedRowSelected(selectedRow: any) {
    this.selectedRemove = true;
    const id: number = selectedRow.id;
    if (this.removeRules) {
      this.removeRules.push(id);
    } else {
      this.removeRules = [id];
    }
  }

  onSelectedRowUnSelected(unSelectedRow: any) {
    this.selectedRemove = false;
    this.removeRules = this.removeRules.filter(
      (item) => item !== unSelectedRow.id
    );
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private dialog: MatDialog,
    private ruleBookService: RuleBookService,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<AddRulesToRiskComponent>
  ) {
    const lazyEvent = {
      first: 1,
      rows: 10,
      sortField: "name",
      sortOrder: -1,
      filters: {
        name: [{ value: null, matchMode: "contains", operator: "and" }],
        description: [{ value: null, matchMode: "contains", operator: "and" }],
        hostName: [{ value: null, matchMode: "contains", operator: "and" }],
        userName: [{ value: null, matchMode: "contains", operator: "and" }],
        clientNumber: [{ value: null, matchMode: "contains", operator: "and" }],
        sysNr: [{ value: null, matchMode: "contains", operator: "and" }],
        languageCode: [{ value: null, matchMode: "contains", operator: "and" }],
        sid: [{ value: null, matchMode: "contains", operator: "and" }],
      },
      globalFilter: null,
    };
    this.lazyEvent = this.encodeParams(JSON.stringify(lazyEvent));
  }

  onSelect(event: MatSelectChange) {
    switch (event.value) {
      case 1:
        this.rcSelection = "OR";
        this.disabled = true;
        break;
      case 2:
        this.rcSelection = "AND";
        this.disabled = true;
        break;
      case 3:
        this.disabled = false;
        break;
    }
  }

  addSelected() {
    this.checkSelectedAvailable();
    this.ruleBookService
      .selectedRules(this.lazyEvent, this.riskId, this.selectedRules)
      .pipe(
        tap((res) => {
          this.selectedData = res.data.rows;
          this.selectedRules.forEach((selectedId) => {
            this.availableData = this.availableData.filter((item) => {
              return item["id"] !== selectedId;
            });
          });
        }),
        catchError((err) => {
          return throwError(() => err);
        }),
        takeUntil(this.subject)
      )
      .subscribe();
  }

  addAll() {
    this.selectedData = this.selectedData.concat(this.availableData);
    this.selectedData.map((item) => {
      if (this.selectedRules) {
        this.selectedRules.push(item.id);
      } else {
        this.selectedRules = [item.id];
      }
    });
    this.availableData = [];
  }

  removeSelected() {
    this.checkSelectedRemove();
    this.ruleBookService
      .selectedRules(this.lazyEvent, this.riskId, this.removeRules)
      .pipe(
        tap((res) => {
          this.availableData = this.availableData.concat(res.data.rows);
          res.data.rows.forEach((removeId) => {
            this.selectedData = this.selectedData.filter((item) => {
              return item.id !== removeId.id;
            });
          });
        }),
        catchError((err) => {
          return throwError(() => err);
        }),
        takeUntil(this.subject)
      )
      .subscribe();
    this.removeRules.forEach(
      (removeId) =>
        (this.selectedRules = this.selectedRules.filter((item) => {
          return item !== removeId;
        }))
    );
  }

  removeAll() {
    this.availableData = this.availableData.concat(this.selectedData);
    this.selectedRules = [];
    this.selectedData = [];
  }

  save() {
    const data = {
      riskId: this.riskId,
      selectedRules: this.selectedRules,
      rcSelection: this.rcSelection,
      crossSystemMap: this.crossSystemMap,
    };

    this.ruleBookService
      .saveSelectedRules(data)
      .pipe(
        tap((res) => {
          this.notificationService.show(res);
          this.dialogRef.close(true);
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
    this.riskId = this.dialogData.selectedRiskData.id;
    this.title = "Add Rules To Risk - " + this.dialogData.selectedRiskData.name;
    this.ruleBookService
      .availableRules(this.lazyEvent, this.riskId)
      .subscribe((res) => {
        this.availableData = res.data.rows;
        res.data.rows.map((item) => {
          if (this.availableSelectedRules) {
            this.availableSelectedRules.push(item.id);
          } else {
            this.availableSelectedRules = [item.id];
          }
          this.loading = false;
        });
      });
    this.selectedData = this.dialogData.selectedRuleData;
    this.selectedData.map((item) => {
      if (this.selectedRules) {
        this.selectedRules.push(item["id"]);
      } else {
        this.selectedRules = [item["id"]];
      }
    });
  }
}
