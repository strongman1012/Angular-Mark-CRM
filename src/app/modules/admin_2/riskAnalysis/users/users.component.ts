import {
  AfterViewInit,
  Component, Input, OnChanges,
  OnInit, SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  LoadSelectionService,
} from '../../../../backend-api/load-selection.service';
import {MatPaginator} from '@angular/material/paginator';

import {tap} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {UserDatasource} from './userList/user-datasource';
import {FormBuilder} from '@angular/forms';
import {UserListComponent} from './userList/user-list.component';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class UsersComponent implements AfterViewInit, OnInit, OnChanges {
  @Input() preSelection;
  displayedColumns: string[] = ['userId', 'name', 'type', 'group'];
  private userList = new Set<number>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: UserDatasource;
  private selectedUsers = new Set<number>();

  menuItems = [
    {label: 'Remove', icon: 'pi pi-user-plus', command: () => this.remove()},
    {label: 'Remove All', icon: 'pi pi-user-edit', command: () => this.removeAll()},
    {label: 'Select', icon: 'pi pi-trash', command: () => this.select()},

  ];

  /**
   * Constructor
   */
  constructor(
      private _formBuilder: FormBuilder,
      public dialog: MatDialog,
      private _loadSelectionService: LoadSelectionService) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {

    // this.paginator.page.pipe(tap(() => this.loadSelectedUsers())).subscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.preSelection != null) {
      console.log(this.preSelection);
    }
  }

  loadSelectedUsers() {
    this.dataSource.loadSelectedUsers(this.sapSystemId,
        this.selectedUserAsString,
        'asc',
        this.paginator.pageIndex,
        this.paginator.pageSize);
  }

  get selectedUserAsString() { // right now: ['1','3']
    return Array.from(this.selectedUsers).join(',');
  }

  get sapSystemId() { // right now: ['1','3']
    return localStorage.getItem('sapSystemId');
  }

  remove() {

    this.userList.forEach((item, value) => {
      this.selectedUsers.delete(parseInt(String(item), 10));
    });

    this.loadSelectedUsers();
  }

  removeAll() {

    this.selectedUsers.clear();
    this.loadSelectedUsers();
  }

  select() {

    this.openUserSelect();
  }

  openUserSelect() {
    const dialogRef = this.dialog.open(UserListComponent, {
      autoFocus: false,
      maxHeight: '80vh',
      width: '70%',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.selectedUsers = result.data;
      this.loadSelectedUsers();
    });
  }

  changed($event) {
    if ($event.target.checked) {
      this.userList.add($event.target.value);
    } else {
      this.userList.delete($event.target.value);
    }
  }
}
