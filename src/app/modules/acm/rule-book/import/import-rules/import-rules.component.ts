import { Component, OnInit } from "@angular/core";
import { RuleBookService } from "app/backend-api/rule-book.service";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import { catchError, tap, pipe, takeUntil, throwError, Subject } from "rxjs";
import { NotificationService } from "app/shared/notification.service";

@Component({
  selector: "app-import-rules",
  templateUrl: "./import-rules.component.html",
  styleUrls: ["./import-rules.component.scss"],
})
export class ImportRulesComponent implements OnInit {
  ruleTemplateData: any = [
    {
      RuleName: "RuleName24",
      Description: "Rule description1",
      BusinessProcess: "BP1",
      BusinessSubProcess: "Bp1_SP1",
      RuleType: "RT1",
    },
    {
      RuleName: "RuleName25",
      Description: "Rule description2",
      BusinessProcess: "BP2",
      BusinessSubProcess: "Bp2_SP1",
      RuleType: "RT3",
    },
    {
      RuleName: "RuleName26",
      Description: "Rule description3",
      BusinessProcess: "BP3",
      BusinessSubProcess: "Bp3_SP1",
      RuleType: "RT2",
    },
    {
      RuleName: "RuleName27",
      Description: "Rule description4",
      BusinessProcess: "BP4",
      BusinessSubProcess: "Bp4_SP1",
      RuleType: "RT1",
    },
    {
      RuleName: "RuleName28",
      Description: "Rule description5",
      BusinessProcess: "BP2",
      BusinessSubProcess: "Bp2_SP1",
      RuleType: "RT1",
    },
    {
      RuleName: "RuleName29",
      Description: "Rule description6",
      BusinessProcess: "BP1",
      BusinessSubProcess: "Bp1_SP1",
      RuleType: "RT3",
    },
    {
      RuleName: "RuleName30",
      Description: "Rule description7",
      BusinessProcess: "BP2",
      BusinessSubProcess: "Bp2_SP1",
      RuleType: "RT1",
    },
    {
      RuleName: "RuleName31",
      Description: "Rule description8",
      BusinessProcess: "BP1",
      BusinessSubProcess: "Bp1_SP1",
      RuleType: "RT2",
    },
    {
      RuleName: "RuleName32",
      Description: "Rule description9",
      BusinessProcess: "BP3",
      BusinessSubProcess: "Bp3_SP1",
      RuleType: "RT1",
    },
    {
      RuleName: "RuleName33",
      Description: "Rule description10",
      BusinessProcess: "BP4",
      BusinessSubProcess: "Bp4_SP1",
      RuleType: "RT1",
    },
    {
      RuleName: "RuleName34",
      Description: "Rule description11",
      BusinessProcess: "BP1",
      BusinessSubProcess: "Bp1_SP1",
      RuleType: "RT3",
    },
    {
      RuleName: "RuleName35",
      Description: "Rule description12",
      BusinessProcess: "BP4",
      BusinessSubProcess: "Bp4_SP1",
      RuleType: "RT1",
    },
    {
      RuleName: "RuleName36",
      Description: "Rule description13",
      BusinessProcess: "BP3",
      BusinessSubProcess: "Bp3_SP1",
      RuleType: "RT1",
    },
    {
      RuleName: "RuleName37",
      Description: "Rule description14",
      BusinessProcess: "BP2",
      BusinessSubProcess: "Bp2_SP1",
      RuleType: "RT3",
    },
    {
      RuleName: "RuleName38",
      Description: "Rule description15",
      BusinessProcess: "BP1",
      BusinessSubProcess: "Bp1_SP1",
      RuleType: "RT1",
    },
  ];

  ruleObjectTemplateData = [
    {
      RuleName: "RuleName24",
      Object: "Obj1",
      Field: "Field1",
      Value: "Value1",
      JoinByAnd: "true",
    },
    {
      RuleName: "RuleName25",
      Object: "Obj5",
      Field: "Field5",
      Value: "Value5",
      JoinByAnd: "true",
    },
    {
      RuleName: "RuleName26",
      Object: "Obj2",
      Field: "Field2",
      Value: "Value2",
      JoinByAnd: "true",
    },
    {
      RuleName: "RuleName27",
      Object: "Obj3",
      Field: "Field3",
      Value: "Value3",
      JoinByAnd: "true",
    },
    {
      RuleName: "RuleName28",
      Object: "Obj4",
      Field: "Field4",
      Value: "Value4",
      JoinByAnd: "false",
    },
    {
      RuleName: "RuleName29",
      Object: "Obj1",
      Field: "Field1",
      Value: "Value1",
      JoinByAnd: "false",
    },
    {
      RuleName: "RuleName30",
      Object: "Obj2",
      Field: "Field2",
      Value: "Value2",
      JoinByAnd: "false",
    },
    {
      RuleName: "RuleName31",
      Object: "Obj3",
      Field: "Field3",
      Value: "Value3",
      JoinByAnd: "false",
    },
    {
      RuleName: "RuleName32",
      Object: "Obj4",
      Field: "Field4",
      Value: "Value4",
      JoinByAnd: "false",
    },
  ];
  uploadMessage: string;
  private subject = new Subject<boolean>();

  constructor(
    private ruleBookService: RuleBookService,
    private notificationService: NotificationService
  ) {}

  onClickRuleTemplate() {
    const filename = "RuleSample";
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.ruleTemplateData
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

  onClickRuleObjectTemplate() {
    const filename = "RuleObjectSample";
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(
      this.ruleObjectTemplateData
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

  saveExcelFile(buffer: any, filename: string): void {
    const blob: Blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `${filename}.xlsx`);
  }

  onUploadRulesClick() {
    const fileInput = document.getElementById("fileInputRules");
    fileInput.click();
  }

  onFileRulesSelected(event) {
    const file: File = event.target.files[0];

    console.log(file);
    this.uploadRulesFile(file);
  }

  uploadRulesFile(file: File) {
    const formData: FormData = new FormData();
    formData.append("fileUpload", file);

    this.ruleBookService
      .uploadRules(formData)
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

  onUploadRulesObjectClick() {
    const fileInput = document.getElementById("fileInputRulesObject");
    fileInput.click();
  }

  onFileRulesObjectSelected(event) {
    const file: File = event.target.files[0];
    this.uploadRulesObject(file);
  }

  uploadRulesObject(file: File) {
    const formData: FormData = new FormData();
    formData.append("fileUpload", file);
    this.ruleBookService
      .uploadRulesObject(formData)
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

  onUploadRulesObjectOverWriteClick() {
    const fileInput = document.getElementById("fileInputRulesObject");
    fileInput.click();
  }

  ngOnInit(): void {}
}
