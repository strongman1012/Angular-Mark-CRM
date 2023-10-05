import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of, switchMap, throwError} from 'rxjs';


@Injectable()
export class LoadSelectionService {

    constructor(private _httpClient: HttpClient) {
    }

    loadSelection(): Observable<any> {
        return this._httpClient.get('adhocAnalysis/adhocSelection').pipe(
            switchMap((response: any) => of(response))
        );
    }

    userList(sapSystemId, filteredUserIds, sort, filter, page, total): Observable<any> {
        if (filter === null || filter === '') {
            filter = '';
        } else {
            filter = encodeURI(JSON.stringify(filter));
        }
        return this._httpClient.get(`adhocAnalysis/getFilteredUsers?
        rows='${total}
        &page=${page}
        &sord=${sort}
        &filters=${filter}
        &sapSystemId=${sapSystemId}
        &userIds=${filteredUserIds}`);
    }

    userSelectedList(sapSystemId, filteredUserIds, sort, page, total): Observable<any> {
        return this._httpClient.get('adhocAnalysis/selectedUserDetails?rows=' + total + '&page=' + page +
            '&sord=' + sort + '&sapSystemId=' + sapSystemId + '&userIds=' + filteredUserIds);
    }


    ruleList(sapSystemId, filteredRuleIds, sort, filter, page, total): Observable<any> {
        if (filter === null || filter === '') {
            filter = '';
        } else {
            filter = encodeURI(JSON.stringify(filter));
        }
        return this._httpClient.get('adhocAnalysis/favRules?rows=' + total + '&page=' + page +
            '&sord=' + sort + '&filters=' + filter +
            '&sapSystemId=' + sapSystemId + '&ruleIds=' + filteredRuleIds);
    }

    ruleSelectedList(sapSystemId, filteredRuleIds, sort, page, total): Observable<any> {
        return this._httpClient.get('adhocAnalysis/selectedRules?rows=' + total + '&page=' + page +
            '&sord=' + sort + '&sapSystemId=' + sapSystemId + '&ruleIds=' + filteredRuleIds);
    }
}
