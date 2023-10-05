import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { map, Subject, takeUntil, tap } from "rxjs";
import { RiskAnalysisOnlineService } from "../../risk-analysis-online.service";

@Component({
  selector: "online-rule-detail",
  // template: ``,
  templateUrl: "./online-rule-detail.component.html",
})
export class OnlineRuleDetailComponent implements OnInit, OnDestroy {
  private subject = new Subject<boolean>();
  reportingUnit: any;

  items: any;
  cols = [
    { name: "name", type: "text", header: "Object" },
    { name: "fieldName", type: "text", header: "Field Name" },
    { name: "fieldValue", type: "text", header: "Value" },
    { name: "joinByAnd", type: "boolean", header: "Join By And" },
  ];
  primaryKey: "id";
  rule: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private apiService: RiskAnalysisOnlineService
  ) {}

  ngOnInit(): void {
    this.initDetail();
  }

  public initDetail() {
    const data = { ruleId: this.dialogData.ruleId };

    this.apiService
      .ruleDetail(data)
      .pipe(
        tap((apiResponse) => {
          if (apiResponse.success) {
            this.items = apiResponse.data;
            this.rule = apiResponse.data[0].rule;
          }
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
