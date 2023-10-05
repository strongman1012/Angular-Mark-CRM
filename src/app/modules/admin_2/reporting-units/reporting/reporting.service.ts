import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../../../backend-api/models/api-response';

@Injectable({
  providedIn: 'root',
})
export class ReportingService {

  constructor(private httpClient: HttpClient) {
  }

  list(params): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(`reportingUnit/getReportingUnits?`,
        {params: new HttpParams({fromObject: {...params}})});
  }

  dashboard(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(`reportingUnit/dashboardData`);
  }

  saveFirst(data: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
        `reportingUnit/validateDbConnectionWizard`, data);
  }

  saveSecond(data: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`reportingUnit/wizardOperations`,
        data);
  }

  delete(sapSystemId: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
        `reportingUnit/deleteRU?id=${sapSystemId}`);
  }

  update(sapSystemId: string, data: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`reportingUnit/saveEdit`, data);
  }

  detail(reportingId: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
        `admin/reportUnitusers/${reportingId}`);
  }

  initForm(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(`reportingUnit/loadAddWizard`);
  }

  initFormForUpdate(systemId): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
        `reportingUnit/loadEdit?id=${systemId}`);
  }
}
