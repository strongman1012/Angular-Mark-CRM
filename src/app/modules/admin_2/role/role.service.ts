import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponse} from 'app/backend-api/models/api-response';

@Injectable({
  providedIn: 'root',
})
export class RoleService {

  constructor(private httpClient: HttpClient) {
  }

  list(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(`admin/getRoles`);
  }

  store(data: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`admin/addRoleOperations?oper=add`,
        data);
  }

  delete(id: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`admin/deleteRole?id=${id}`,{});
  }

  update(data: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
        `admin/addRoleOperations?oper=edit`, data);
  }

  updateLdapTitle(data: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`admin/editLdapTitle`, data);
  }

  initDataForEdit(id: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(`admin/editRole?id=${id}`);
  }
  initEditRoleOperationForm(id: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(`admin/manageRoleOperations?id=${id}`);
  }
  operationsForEdit(id: any): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(
        `admin/manageRoleOperations?id=${id}`);
  }

  updateRoleOperations(data: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`admin/roleOperations`, data);
  }

  ldapTitles() {
    return this.httpClient.post<ApiResponse>(`admin/ldapTitles`,{});
  }

  initNewLdapTitleForm() {
    return this.httpClient.get<ApiResponse>(`admin/addLdapTitle`);
  }
  initEditLdapTitleForm(title: any) {
    return this.httpClient.get<ApiResponse>(`admin/editLdapTitle?title=${title}`);
  }
  storeLdapTitle(data) {
    return this.httpClient.post<ApiResponse>(`admin/addLdapTitle`,data);
  }

  deleteLdapTitle(title: any) {
    return this.httpClient.post<ApiResponse>(`admin/deleteLdapTitle?title=${title}`,{});
  }
}
