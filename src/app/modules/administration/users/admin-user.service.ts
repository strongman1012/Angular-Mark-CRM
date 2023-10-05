import {Injectable} from '@angular/core';
import {map, mergeMap, Observable, of, switchMap, tap} from 'rxjs';
import {ApiResponse} from '../../../backend-api/models/api-response';
import {HttpClient, HttpParams} from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class AdminUserService {

    constructor(private httpClient: HttpClient) {
    }
    getMailForm(): Observable<ApiResponse> {
        return this.httpClient.get<ApiResponse>(`sys/mailform`);
    }
    getEventViewerLoglist(): Observable<ApiResponse> {
        return this.httpClient.get<ApiResponse>(`admin/getLog?lazyEvent=%7B%22first%22:0,%22rows%22:10,%22sortOrder%22:1,%22filters%22:%7B%22username%22:%7B%22value%22:null,%22matchMode%22:%22startsWith%22%7D,%22firstName%22:%7B%22value%22:null,%22matchMode%22:%22startsWith%22%7D,%22lastName%22:%7B%22value%22:null,%22matchMode%22:%22startsWith%22%7D,%22email%22:%7B%22value%22:null,%22matchMode%22:%22in%22%7D%7D,%22globalFilter%22:null%7D`);
    }
    list(): Observable<ApiResponse> {
        return this.httpClient.get<ApiResponse>(`admin/getUsers?`);
    }

    save(data: any): Observable<ApiResponse> {
        return this.httpClient.post<ApiResponse>(`admin/userOperations?oper=add`, data);
    }

    delete(userId: any): Observable<ApiResponse> {
        return this.httpClient.post<ApiResponse>(`admin/deleteUser?userId=${userId}`, null);
    }

    update(userId: string, data: any): Observable<ApiResponse> {
        return this.httpClient.post<ApiResponse>(`admin/userOperations?oper=edit&id=${userId}`, data);
    }

    updatePassword(data: any) {
        return this.httpClient.post<ApiResponse>(`admin/changePassword`, data);
    }

    reportingUnits(userId: any) {
        return this.httpClient.get<ApiResponse>(`admin/addReportingUnits?id=${userId}`);
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
