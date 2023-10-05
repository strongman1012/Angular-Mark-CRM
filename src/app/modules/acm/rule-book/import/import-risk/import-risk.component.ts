import { Component, OnInit } from "@angular/core";
import { RuleBookService } from "app/backend-api/rule-book.service";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { catchError, tap, pipe, takeUntil, throwError, Subject } from "rxjs";
import { NotificationService } from "app/shared/notification.service";

@Component({
  selector: "app-import-risk",
  templateUrl: "./import-risk.component.html",
  styleUrls: ["./import-risk.component.scss"],
})
export class ImportRiskComponent implements OnInit {
  riskSampleTemplate = [
    {
      RiskName: "RiskName24",
      Description: "Risk Description1",
      BusinessProcess: "BP1",
      BusinessSubProcess: "BP1_SP1",
      RiskType: "RiskType1",
      CrossSystem: "false",
      DetailDescripton: "Detail Description about Risk or empty value",
    },
    {
      RiskName: "RiskName25",
      Description: "Risk Description2",
      BusinessProcess: "BP2",
      BusinessSubProcess: "BP2_SP1",
      RiskType: "RiskType1",
      CrossSystem: "false",
      DetailDescripton: "Detail Description about Risk or empty value",
    },
    {
      RiskName: "RiskName26",
      Description: "Risk Description3",
      BusinessProcess: "BP3",
      BusinessSubProcess: "BP3_SP1",
      RiskType: "RiskType1",
      CrossSystem: "false",
      DetailDescripton: "Detail Description about Risk or empty value",
    },
    {
      RiskName: "RiskName22",
      Description: "Risk Description4",
      BusinessProcess: "BP4",
      BusinessSubProcess: "BP4_SP1",
      RiskType: "RiskType1",
      CrossSystem: "false",
      DetailDescripton: "Detail Description about Risk or empty value",
    },
    {
      RiskName: "RiskName23",
      Description: "Risk Description5",
      BusinessProcess: "BP2",
      BusinessSubProcess: "BP2_SP1",
      RiskType: "RiskType1",
      CrossSystem: "false",
      DetailDescripton: "Detail Description about Risk or empty value",
    },
  ];

  riskRuleSampleTemplate = [
    { RiskName: "RiskName24", RiskCondition: "RuleName24 AND RuleName25" },
    { RiskName: "RiskName25", RiskCondition: "RuleName26 OR RuleName22" },
    {
      RiskName: "RiskName26",
      RiskCondition: "RuleName23 AND RuleName24 AND RuleName25",
    },
    { RiskName: "RiskName22", RiskCondition: "RuleName23 AND RuleName25" },
    { RiskName: "RiskName23", RiskCondition: "RuleName26 OR RuleName24" },
  ];

  uploadMessage: string;

  private subject = new Subject<boolean>();

  constructor(
    private ruleBookService: RuleBookService,
    private notificationService: NotificationService
  ) {}

  saveExcelFile(buffer: any, filename: string): void {
    const blob: Blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `${filename}.xlsx`);
  }

  onClickRiskTemplate() {
    const filename = "RiskSample";
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.riskSampleTemplate
    );
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    this.saveExcelFile(excelBuffer, filename);
  }

  onClickRiskRuleTemplate() {
    const filename = "RiskRuleSample";
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.riskRuleSampleTemplate
    );
    const workbook: XLSX.WorkBook = {
      Sheets: { data: worksheet },
      SheetNames: ["data"],
    };
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    this.saveExcelFile(excelBuffer, filename);
  }

  onUploadRiskClick() {
    const fileInput = document.getElementById("fileInputRisk");
    fileInput.click();
  }

  onFileRiskSelected(event) {
    const file: File = event.target.files[0];
    this.uploadRiskFile(file);
  }

  uploadRiskFile(file: File) {
    const formData: FormData = new FormData();
    formData.append("fileUpload", file);
    this.ruleBookService
      .uploadRisk(formData)
      .pipe(
        tap((res) => {
          if (res.data.error === false) {
            this.uploadMessage = res.data.message;
          } else {
            this.notificationService.show(res);
          }
        }),
        catchError((err) => {
          return throwError(() => err);
        }),
        takeUntil(this.subject)
      )
      .subscribe();
  }

  onUploadRiskRulesClick() {
    const fileInput = document.getElementById("fileInputRiskRules");
    fileInput.click();
  }

  onFileRiskRulesSelected(event) {
    const file: File = event.target.files[0];
    this.uploadRiskRulesFile(file);
  }

  uploadRiskRulesFile(file: File) {
    const formData: FormData = new FormData();
    formData.append("fileUpload", file);
    this.ruleBookService
      .uploadRiskRules(formData)
      .pipe(
        tap((res) => {
          if (res.data.error === false) {
            this.uploadMessage = res.data.message;
          } else {
            this.notificationService.show(res);
          }
        }),
        catchError((err) => {
          return throwError(() => err);
        }),
        takeUntil(this.subject)
      )
      .subscribe();
  }

  ngOnInit(): void {}
}
