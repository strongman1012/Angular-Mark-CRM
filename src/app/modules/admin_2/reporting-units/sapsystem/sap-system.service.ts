import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from 'app/backend-api/models/api-response';

@Injectable({
  providedIn: 'root',
})
export class SapSystemService {

  constructor(private httpClient: HttpClient) {
  }

  list(params): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(`sapsystem/getSapConfig?`,
        {params: new HttpParams({fromObject: {...params}})});
  }

  save(data: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`sapsystem/operations?oper=add`,
        data);
  }

  delete(sapSystemId: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
        `reportingUnit/deleteRU?id=${sapSystemId}`);
  }

  update(sapSystemId: string, data: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
        `sapsystem/operations?oper=edit&id=${sapSystemId}`, data);
  }

  initForm(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(`sapsystem/loadAdd?edit=false`);
  }

  initFormForUpdate(systemId): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
        `sapsystem/loadAdd?edit=true&id=${systemId}`);
  }

  testSapSystem(systemId): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
        `sapsystem/testConn?id=${systemId}`);
  }
}
