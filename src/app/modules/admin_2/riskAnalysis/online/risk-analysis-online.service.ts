import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of, switchMap, throwError} from 'rxjs';
import {ApiResponse} from '../../../../backend-api/models/api-response';

@Injectable(
    {
      providedIn: 'root',
    },
)
export class RiskAnalysisOnlineService {

  constructor(private httpClient: HttpClient) {
  }

  loadSelection(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>('adhocAnalysis/adhocSelection');
  }

  findFavorites(sapSystemId: any, analysisType: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
        `analysis/findFavourites?sapSystemId=${sapSystemId}&risk=${analysisType}`,
    );
  }

  userList(
      sapSystemId, filteredUserIds, sort, filter, page,
      total): Observable<any> {
    if (filter === null || filter === '') {
      filter = '';
    } else {
      filter = encodeURI(JSON.stringify(filter));
    }
    return this.httpClient.get(`adhocAnalysis/getFilteredUsers?
        rows='${total}
        &page=${page}
        &sord=${sort}
        &filters=${filter}
        &sapSystemId=${sapSystemId}
        &userIds=${filteredUserIds}`);
  }


  userSelectedList(data): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`adhocAnalysis/selectedUserDetails`,data);
  }
  roleSelectedList(data): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`adhocAnalysis/currentlySelectedRoles`,data);
  }

  savePreselection(data: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`adhocAnalysis/savePreSelection`,
        data);
  }
  selectedRuleList(data): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`adhocAnalysis/selectedRules`,data);
  }
  selectedRiskList(data): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`adhocAnalysis/selectedRisks`,data);
  }
  findUsers(data): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`adhocAnalysis/findUsers`,data);
  }
  findRoles(data): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`adhocAnalysis/rolesResults`,data);
  }
  findRules(data): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`adhocAnalysis/favRules`,data);
  }
  findRisks(data): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`adhocAnalysis/favRisks`,data);
  }
  findAllUsers(data): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`adhocAnalysis/selectAllUsers`,data);
  }
  findAllRoles(data): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`adhocAnalysis/selectAllRoles`,data);
  }
  findAllRules(data): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`adhocAnalysis/selectFavAllRules`,data);
  }
  findAllRisks(data) {
    return this.httpClient.post<ApiResponse>(`adhocAnalysis/selectFavAllRisks`,data);
  }
  userDetail(data): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(`adhocAnalysis/userDetails`,{params: new HttpParams({fromObject: {...data}})});
  }
  roleDetail(data): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(`adhocAnalysis/roleDetails`,{params: new HttpParams({fromObject: {...data}})});
  }
  ruleDetail(data): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(`rules/ruleDetails`,{params: new HttpParams({fromObject: {...data}})});
  }
  riskDetail(data): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(`risks/riskDetailsByName`,{params: new HttpParams({fromObject: {...data}})});
  }

  startAnalysis(data): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`adhocAnalysis/startAnalysis`,data);
  }

  resultsDetail(data): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(`adhocAnalysis/results`,{params: new HttpParams({fromObject: {...data}})});
  }
  resultSummary(data): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(`analysis/resultSummary`,{params: new HttpParams({fromObject: {...data}})});
  }
  violationResults(data): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(`analysis/violationResults`,{params: new HttpParams({fromObject: {...data}})});
  }
}
