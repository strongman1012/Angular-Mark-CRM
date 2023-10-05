import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, ReplaySubject, Subject, tap} from 'rxjs';
import {User} from 'app/core/user/user.types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

  /**
   * Constructor
   */
  constructor(private _httpClient: HttpClient) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------
  get user$(): Observable<User> {
    return this._user.asObservable();
  }

  /**
   * Setter & getter for user
   *
   * @param value
   */
  set user(value: User) {
    // Store the value
    this._user.next(value);
  }

  setUserWithParams(data: any) {
    const user: User = {
      email: data.email,
      id: data.id,
      name: data.username,
      username: data.username,
      roles: data.roles,
      reportingUnits: data.reportingUnits,
    };
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Update the user
   *
   * @param user
   */
  update(user: User): Observable<any> {
    return this._httpClient.patch<User>('api/common/user', {user}).pipe(
        map((response) => {
          this._user.next(response);
        }),
    );
  }
}
