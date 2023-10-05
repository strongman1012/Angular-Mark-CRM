import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  LoadSelectionService,
} from '../../../../../backend-api/load-selection.service';
import {MatPaginator} from '@angular/material/paginator';
import {UserDatasource} from './user-datasource';
import {debounceTime, distinctUntilChanged, fromEvent, tap} from 'rxjs';
import {MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'role-list',
  templateUrl: './user-list.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class UserListComponent implements OnInit, AfterViewInit {
  public reportingUnit;
  private selectedUsers: string[];
  private userList = new Set<number>();

  displayedColumns: string[] = ['userId', 'name', 'type', 'group'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: UserDatasource;

  @ViewChild('searchInput') input: ElementRef;
  isAllChecked: boolean;

  /**
   * Constructor
   */
  constructor(
      private _loadSelectionService: LoadSelectionService,
      private dialogRef: MatDialogRef<UserListComponent>,
  ) {

  }

  ngOnInit(): void {
    this.selectedUsers = [''];
    this.dataSource = new UserDatasource(this._loadSelectionService);
    this.dataSource.loadUsers(this.sapSystemId, this.selectedUserIds, 'asc', '',
        0, 5);
  }

  ngAfterViewInit() {
    this.paginator.page.pipe(tap(() => this.loadUsers())).subscribe();
    fromEvent(this.input.nativeElement, 'keyup').pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadUsers();
        }),
    ).subscribe();
  }

  loadUsers() {
    return this.dataSource.loadUsers(this.sapSystemId, this.selectedUserIds,
        'asc', this.input.nativeElement.value,
        this.paginator.pageIndex,
        this.paginator.pageSize);
  }

  get sapSystemId() { // right now: ['1','3']
    return localStorage.getItem('sapSystemId');
  }

  get selectedUserIds() { // right now: ['1','3']
    return this.selectedUsers.join(',');
  }

  changed($event) {
    if ($event.target.checked) {
      this.userList.add($event.target.value);
    } else {
      this.userList.delete($event.target.value);
    }
  }

  save() {
    this.dialogRef.close({data: this.userList});
  }

  selectAll() {
    this.isAllChecked = !this.isAllChecked;
    this.loadUsers().pipe().subscribe((result) => {
      result.forEach((item) => {
        this.userList.add(item.id);
      });
    });
  }
}
