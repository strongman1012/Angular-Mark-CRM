import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { RuleBookService } from "app/backend-api/rule-book.service";
import { Subject, takeUntil, tap } from "rxjs";

@Component({
  selector: "app-risk-details",
  templateUrl: "./risk-details.component.html",
  styleUrls: ["./risk-details.component.scss"],
})
export class RiskDetailsComponent implements OnInit {
  private subject = new Subject<boolean>();

  showDetail: boolean = true;
  items = [];
  selectedItems = [];
  itemsForTable = [];
  cols = [
    { name: "ruleName", type: "text", header: "Rule" },
    {
      name: "ruleType.name",
      type: "text",
      header: "Rule Type",
    },
    { name: "ruleDescription", type: "text", header: "Description" },
  ];
  selectedCols = [
    { name: "name", type: "text", header: "Object" },
    { name: "fieldName", type: "text", header: "Field" },
    { name: "fieldValue", type: "text", header: "Value" },
    { name: "joinByAnd", type: "boolean", header: "Join By And" },
  ];
  primaryKey: "id";
  risk: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private ruleBookService: RuleBookService
  ) {}

  ngOnInit(): void {
    this.initDetail();
  }
  public initDetail() {
    this.showDetail = false;
    const riskId = this.dialogData.riskId;
    this.ruleBookService
      .riskDetail(riskId)
      .pipe(
        tap((apiResponse) => {
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
}
