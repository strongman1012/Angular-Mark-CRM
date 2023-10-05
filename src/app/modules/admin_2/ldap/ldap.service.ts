import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../../backend-api/models/api-response';

@Injectable({
  providedIn: 'root',
})
export class LdapService {

  constructor(private httpClient: HttpClient) {
  }

  configurations(params): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(`admin/getLdapConfigurations?`,
        {params: new HttpParams({fromObject: {...params}})});
  }

  logs(params): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(`admin/getLdapConfigurationLogs?`,
        {params: new HttpParams({fromObject: {...params}})});
  }

  logDetail(id) {
    return this.httpClient.get<ApiResponse>(`admin/configLog?id=${id}`);
  }

  initForm() {
    return this.httpClient.get<ApiResponse>(
        `admin/loadAddLdapConfiguration?edit=false`);
  }

  editForm(id: any) {
    return this.httpClient.get<ApiResponse>(
        `admin/loadAddLdapConfiguration?edit=true&id=${id}`);
  }

  store(data: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`admin/ldapOperations?oper=add`,
        data);
  }

  update(data: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`admin/ldapOperations?oper=edit`,
        data);
  }

  deleteConfiguration(id) {
    return this.httpClient.post<ApiResponse>(
        `admin/deleteLdapConfiguration?id=${id}`, {});
  }

  testConnection(id, name) {
    return this.httpClient.post<ApiResponse>(
        `admin/testLdapConfiguration?id=${id}&name=${name}`, {});
  }
}
