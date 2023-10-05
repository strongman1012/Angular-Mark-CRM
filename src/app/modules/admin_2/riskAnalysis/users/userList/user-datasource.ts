import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {
  BehaviorSubject,
  catchError,
  finalize,
  Observable,
  of,
  switchMap,
} from 'rxjs';
import {
  LoadSelectionService,
} from '../../../../../backend-api/load-selection.service';
import {MatPaginator} from '@angular/material/paginator';

export class UserDatasource extends DataSource<any> {
  paginator: MatPaginator;
  private userSubject = new BehaviorSubject<any>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private totalSubject = new BehaviorSubject<number>(0);

  public loading$ = this.loadingSubject.asObservable();
  public total$ = this.totalSubject.asObservable();

  constructor(private loadSelectionService: LoadSelectionService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    return this.userSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.userSubject.complete();
    this.loadingSubject.complete();
    this.totalSubject.complete();
  }

  loadUsers(sapSystemId, userIds, sort, query, page, size) {
    let filter = null;
    if (query != null) {
      filter = {
        groupOp: 'OR',
        rules: [
          {
            field: 'userName.bname',
            op: 'cn',
            data: query,
          },
          {
            field: 'userName.firstName',
            op: 'cn',
            data: query,
          },
          {
            field: 'userName.lastName',
            op: 'cn',
            data: query,
          },
          {
            field: 'userType',
            op: 'cn',
            data: query,
          },
          {
            field: 'userClass',
            op: 'cn',
            data: query,
          },
        ],
      };
    }

    this.loadingSubject.next(true);
    const userObservable = this.loadSelectionService.userList(sapSystemId,
        userIds, sort, filter, page + 1, size).pipe(
        switchMap((res) => {
          this.totalSubject.next(res.records);

          return of(res['rows']);
        }),
        catchError(() => of([])),
        finalize(() => {

          this.loadingSubject.next(false);
        }),
    );
    userObservable.subscribe(users => this.userSubject.next(users));
    return userObservable;
  }

  loadSelectedUsers(sapSystemId, userIds, order, page, size) {

    return this.loadSelectionService.userSelectedList(sapSystemId, userIds,
        order, page + 1, size).pipe(
        switchMap((res) => {
          this.totalSubject.next(res.records);

          return of(res['rows']);
        }),
        catchError(() => of([])),
        finalize(() => {

          this.loadingSubject.next(false);
        }),
    ).subscribe(users => this.userSubject.next(users));
  }
}
