import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiResponse} from '../../../backend-api/models/api-response';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AdminUserService {

  constructor(private httpClient: HttpClient) {
  }

  list(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(`admin/getUsers?`);
  }

  save(data: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(`admin/userOperations?oper=add`,
        data);
  }

  delete(userId: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
        `admin/deleteUser?userId=${userId}`, null);
  }

  update(userId: string, data: any): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(
        `admin/userOperations?oper=edit&id=${userId}`, data);
  }

  updatePassword(data: any) {
    return this.httpClient.post<ApiResponse>(`admin/changePassword`, data);
  }

  reportingUnits(userId: any) {
    return this.httpClient.get<ApiResponse>(
        `admin/addReportingUnits?id=${userId}`);
  }

  saveReportingUnits(data: any) {
    return this.httpClient.post<ApiResponse>(`admin/userRUs`, data);
  }

  userRoles(userId: any) {
    return this.httpClient.get<ApiResponse>(`admin/addUserRoles?id=${userId}`);
  }

  saveUserRoles(data: any) {
    return this.httpClient.post<ApiResponse>(`admin/userRoles`, data);
  }

}
