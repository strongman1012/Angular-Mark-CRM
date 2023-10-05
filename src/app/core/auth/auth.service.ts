import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, Observable, of, switchMap, throwError} from 'rxjs';
import {AuthUtils} from 'app/core/auth/auth.utils';
import {UserService} from 'app/core/user/user.service';
import {ApiResponse} from '../../backend-api/models/api-response';
import {
  LoginRequestModel,
} from '../../backend-api/models/requests/login.request.model';
import {environment} from '../../../environments/environment';
import {User} from '../user/user.types';

@Injectable()
export class AuthService {
  private _authenticated: boolean = false;

  /**
   * Constructor
   */
  constructor(
      private _httpClient: HttpClient,
      private _userService: UserService,
  ) {

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------
  get accessToken(): string {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken === 'undefined') {
      return null;
    }
    return accessToken;
  }

  /**
   * Setter & getter for access token
   */
  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Forgot password
   *
   * @param email
   */
  forgotPassword(email: string): Observable<any> {
    return this._httpClient.post(environment.apiUrl + '/auth/forgot-password',
        email);
  }

  /**
   * Reset password
   *
   * @param password
   */
  resetPassword(password: string): Observable<any> {
    return this._httpClient.post(environment.apiUrl + '/auth/reset-password',
        password);
  }

  /**
   * Sign in
   *
   * @param credentials
   */
  reportingUnits(credentials: LoginRequestModel): Observable<ApiResponse> {
    return this._httpClient.post<ApiResponse>('auth/reporting-units',
        credentials);
  }

  signInWithReportUnit(credentials: { username: string; password: string; reportingUnit: string }): Observable<any> {
    // Throw error, if the user is already logged in
    if (this._authenticated) {
      return throwError('User is already logged in.');
    }

    return this._httpClient.post('auth/sign-in', credentials).pipe(
        switchMap((response: any) => {
          const responseData = response.data;
          // Store the access token in the local storage
          this.accessToken = responseData.accessToken;

          // Store the user on the user service
          this._userService.user = responseData as User;
          this._authenticated = true;
          localStorage.setItem('reportingUnit', credentials.reportingUnit);
          // Return a new observable with the response
          return of(response);
        }),
    );
  }

  /**
   * Sign in using the access token
   */
  signInUsingToken(): Observable<any> {
    // Sign in using the token
    return this._httpClient.post('auth/sign-in-with-token', {
      accessToken: this.accessToken,
      reportingUnit: localStorage.getItem('reportingUnit'),
    }).pipe(
        catchError(() =>

            // Return false
            of(false),
        ),
        switchMap((response: any) => {

          // Replace the access token with the new one if it's available on
          // the response object.
          //
          // This is an added optional step for better security. Once you sign
          // in using the token, you should generate a new one on the server
          // side and attach it to the response object. Then the following
          // piece of code can replace the token with the refreshed one.
          if (response.data == null) {
            return of(false);
          }
          if (response.data.accessToken) {
            this.accessToken = response.data.accessToken;
          }

          // Set the authenticated flag to true
          this._authenticated = true;

          this._userService.setUserWithParams(response.data);

          // Return true
          return of(true);
        }),
    );
  }

  /**
   * Sign out
   */
  signOut(): Observable<any> {
    // Remove the access token from the local storage
    localStorage.removeItem('accessToken');

    // Set the authenticated flag to false
    this._authenticated = false;

    // Return the observable
    return of(true);
  }

  /**
   * Sign up
   *
   * @param user
   */
  signUp(user: { name: string; email: string; password: string; company: string }): Observable<any> {
    return this._httpClient.post('auth/sign-up', user);
  }

  /**
   * Unlock session
   *
   * @param credentials
   */
  unlockSession(credentials: { email: string; password: string }): Observable<any> {
    return this._httpClient.post('auth/unlock-session', credentials);
  }

  /**
   * Check the authentication status
   */
  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    // Check the access token availability
    if (!this.accessToken) {
      return of(false);
    }

    // Check the access token expire date
    if (AuthUtils.isTokenExpired(this.accessToken)) {
      return of(false);
    }

    // If the access token exists, and it didn't expire, sign in using it
    return this.signInUsingToken();
  }
}
