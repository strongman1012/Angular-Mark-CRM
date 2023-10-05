import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { map, Subject, takeUntil, tap } from "rxjs";
import { RiskAnalysisOnlineService } from "../../risk-analysis-online.service";

@Component({
  selector: "online-risk-detail",
  templateUrl: "./online-risk-detail.component.html",
})
export class OnlineRiskDetailComponent implements OnInit, OnDestroy {
  private subject = new Subject<boolean>();

  items = [];
  itemsForTable = [];
  cols = [
    { name: "ruleName", type: "text", header: "Rule" },
    { name: "ruleType.name", type: "text", header: "Rule Type" },
    { name: "ruleDescription", type: "text", header: "Description" },
    { name: "showDetail", type: "button", header: "Details" },
  ];
  selectedCols = [
    { name: "name", type: "text", header: "Object" },
    { name: "fieldName", type: "text", header: "Field" },
    { name: "fieldValue", type: "text", header: "Value" },
    { name: "joinByAnd", type: "boolean", header: "Join By And" },
  ];
  primaryKey: "id";
  risk: any;
  showDetail: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private apiService: RiskAnalysisOnlineService
  ) {}

  ngOnInit(): void {
    // this.reportingUnit = this.dialogData.reportingUnit;
    this.initDetail();
  }

  public initDetail() {
    const data = { riskId: this.dialogData.riskId };

    this.apiService
      .riskDetail(data)
      .pipe(
        tap((apiResponse) => {
          console.log("apiResonse", apiResponse);
          if (apiResponse.success) {
            const values = Object.values(apiResponse.data.ruleMap);
            values.forEach((item) => {
              this.items.push({ risk: item[0].rule, detail: item });
              this.itemsForTable.push(item[0].rule);
            });
            this.risk = apiResponse.data.risk;
          }
        }),
        takeUntil(this.subject)
      )
      .subscribe();
    console.log("items", this.items);
  }

  onRowSelect = (event): void => {
    this.showDetail = true;
    this.selectedItems = this.items
      .filter((p) => p.risk.id === event.data.id)
      .map((q) => q.detail)[0];
    console.log("selected", this.selectedItems);
  };
  onRowUnselect = (event): void => {
    this.showDetail = false;
  };
  selectedItems = [];

  ngOnDestroy(): void {
    this.subject.next(true);
    this.subject.complete();
  }
}
