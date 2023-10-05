import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable, of, switchMap, throwError } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RuleBookService {
  constructor(private _httpClient: HttpClient) {}

  getRules(
    first: any,
    rows: any,
    sortOrder: any,
    sortField: any,
    filters: any
  ): Observable<any> {
    return this._httpClient.get(
      `rules/get?first=${first}&rows=${rows}&sortOrder=${sortOrder}&sortField=${sortField}&filters=${filters}`
    );
  }

  getRuleObjects(ruleId): Observable<any> {
    return this._httpClient.get<any>(`ruleObjects/get?ruleId=${ruleId}`);
  }

  autoCompleteObjectRuleParam(objectName: any): Observable<any> {
    return this._httpClient.get<any>(
      `ruleObjects/autoCompleteObject/${objectName}`
    );
  }

  autoCompleteObjectRule(): Observable<any> {
    return this._httpClient.get<any>("ruleObjects/autoCompleteObject/");
  }

  autoCompleteAuthFieldRuleParam(authfield: any): Observable<any> {
    return this._httpClient.get<any>(
      `ruleObjects/autoCompleteAuthfield/${authfield}`
    );
  }

  authCompleteAuthFieldRule(): Observable<any> {
    return this._httpClient.get<any>("ruleObjects/autoCompleteAuthfield/");
  }

  // getRisks(lazyEvent): Observable<any> {
  //   return this._httpClient.get<any>(`risks/get?lazyEvent=${lazyEvent}`);
  // }

  getRisks(
    first: any,
    rows: any,
    sortOrder: any,
    sortField: any,
    filters: any
  ): Observable<any> {
    return this._httpClient.get(
      `risks/get?first=${first}&rows=${rows}&sortOrder=${sortOrder}&sortField=${sortField}&filters=${filters}`
    );
  }

  getRiskRules(
    first: any,
    rows: any,
    sortOrder: any,
    sortField: any,
    filters: any,
    riskId
  ): Observable<any> {
    return this._httpClient.get<any>(
      `risks/getRules?first=${first}&rows=${rows}&sortOrder=${sortOrder}&sortField=${sortField}&filters=${filters}&riskId=${riskId}`
    );
  }

  getRiskAuditLogs(lazyEvent, timezone): Observable<any> {
    return this._httpClient.get<any>(
      `ruleLog/getRiskAuditLog?lazyEvent=${lazyEvent}&timeZone=${timezone}`
    );
  }

  getRiskRuleLogDetails(logId): Observable<any> {
    return this._httpClient.get<any>(
      `ruleLog/getRiskRuleLogDetails?logId=${logId}`
    );
  }

  getRuleAuditLogs(lazyEvent, timezone): Observable<any> {
    return this._httpClient.get<any>(
      `ruleLog/getRuleAuditLog?lazyEvent=${lazyEvent}&timeZone=${timezone}`
    );
  }

  getRuleObjLogDetails(logId): Observable<any> {
    return this._httpClient.get<any>(
      `ruleLog/getRuleObjLogDetails?logId=${logId}`
    );
  }
  getExportRules(): Observable<any> {
    return this._httpClient.get("rules/exportRules", {
      responseType: "arraybuffer",
    });
  }

  getRuleTransport(): Observable<any> {
    return this._httpClient.get("exportRuleBook", {
      responseType: "blob",
    });
  }

  getAddRequired(): Observable<any> {
    return this._httpClient.get(`rules/addRule`);
  }

  getEditRequired(ruleId: number): Observable<any> {
    return this._httpClient.get(`rules/editRule?ruleId=${ruleId}`);
  }

  ruleSave(data: any): Observable<any> {
    return this._httpClient.post("rules/addRuleSave", data);
  }

  ruleEdit(data: any): Observable<any> {
    return this._httpClient.post("rules/editRuleSave", data);
  }

  ruleCopy(ruleId, clone): Observable<any> {
    return this._httpClient.get(
      `rules/editRule?ruleId=${ruleId}&clone=${clone}`
    );
  }

  ruleDelete(ruleId): Observable<any> {
    return this._httpClient.get(`rules/deleteRule?ruleId=${ruleId}`);
  }

  getExportRisk(): Observable<any> {
    return this._httpClient.get("risks/exportRisks", {
      responseType: "arraybuffer",
    });
  }

  getAddRiskRequired(): Observable<any> {
    return this._httpClient.get("risks/addRisk");
  }

  riskSave(data: any): Observable<any> {
    return this._httpClient.post("risks/addRiskSave", data);
  }

  getEditRiskRequired(riskId: number): Observable<any> {
    return this._httpClient.get(`risks/editRisk?riskId=${riskId}`);
  }

  riskEdit(data: any): Observable<any> {
    return this._httpClient.post(`risks/editRiskSave`, data);
  }

  riskDelete(riskId): Observable<any> {
    return this._httpClient.get(`risks/deleteRisk?riskId=${riskId}`);
  }

  riskEnable(riskId: number): Observable<any> {
    return this._httpClient.get(`risks/enableRisk?riskId=${riskId}`);
  }

  riskDisable(riskId: number): Observable<any> {
    return this._httpClient.get(`risks/disableRisk?riskId=${riskId}`);
  }

  riskConsistensy(): Observable<any> {
    return this._httpClient.get(`risks/inconReport`);
  }

  riskDetail(riskId: number): Observable<any> {
    return this._httpClient.get(`risks/riskDetails?riskId=${riskId}`);
  }

  availableRules(lazyEvent: any, riskId: number): Observable<any> {
    return this._httpClient.get(
      `risks/getFilteredRules?lazyEvent=${lazyEvent}&riskId=${riskId}&selectedRules=`
    );
  }

  selectedRules(
    lazyEvent: any,
    riskId: number,
    selectedRules: any
  ): Observable<any> {
    return this._httpClient.get(
      `risks/getSelectedRules?lazyEvent=${lazyEvent}&&riskId=${riskId}&selectedRules=${selectedRules}`
    );
  }

  allAddOrRemoveRules(
    lazyEvent: any,
    riskId: any,
    selectedRules: any,
    add: boolean
  ): Observable<any> {
    return this._httpClient.get(
      `risks/selectRules?lazyEvent=${lazyEvent}&riskId=${riskId}&selectedRules=${selectedRules}&add=${add}`
    );
  }

  saveSelectedRules(data: any): Observable<any> {
    return this._httpClient.post("risks/saveSelectedRules", data);
  }

  uploadRules(file: any): Observable<any> {
    return this._httpClient.post(`rules/uploadRules`, file);
  }

  uploadRulesObject(formData: any): Observable<any> {
    return this._httpClient.post(
      "ruleObjects/uploadRuleObjects?overwrite=true",
      formData
    );
  }

  uploadRisk(formData: any): Observable<any> {
    return this._httpClient.post(`risks/uploadRisks`, formData);
  }

  uploadRiskRules(formData: any): Observable<any> {
    return this._httpClient.post(`risks/uploadRules`, formData);
  }

  variantRiskRequiredInfo(): Observable<any> {
    return this._httpClient.get("favoratesrisks");
  }

  VariantgetRisks(
    first: any,
    rows: any,
    sortOrder: any,
    sortField: any,
    filter: any
  ): Observable<any> {
    return this._httpClient.get(
      `risks/get?first=${first}&rows=${rows}&sortOrder=${sortOrder}&sortField=${sortField}&filters=${filter}`
    );
  }

  getVariantRisk(id: number): Observable<any> {
    return this._httpClient.get(`favoratesrisks/find/${id}`);
  }

  deleteVariantRisk(id: number): Observable<any> {
    return this._httpClient.get(`favoratesrisks/delete/${id}`);
  }

  saveOrUpdateVariantRisk(data: any): Observable<any> {
    return this._httpClient.post("favoratesrisks/save", data);
  }

  variantRuleRequiredInfo(): Observable<any> {
    return this._httpClient.get("favoratesrules");
  }

  variantgetRules(
    first: any,
    rows: any,
    sortOrder: any,
    sortField: any,
    filter: any
  ): Observable<any> {
    return this._httpClient.get(
      `rules/get?first=${first}&rows=${rows}&sortOrder=${sortOrder}&sortField=${sortField}&filters=${filter}`
    );
  }

  getVariantRules(id: number): Observable<any> {
    return this._httpClient.get(`favoratesrules/find/${id}`);
  }

  deleteVariantRules(id: number): Observable<any> {
    return this._httpClient.get(`favoratesrules/delete/${id}`);
  }

  saveOrUpdateVariantRule(data: any): Observable<any> {
    return this._httpClient.post(`favoratesrules/save`, data);
  }
}
