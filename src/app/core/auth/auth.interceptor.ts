import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from 'app/core/auth/auth.service';
import {AuthUtils} from 'app/core/auth/auth.utils';
import {environment} from '../../../environments/environment';

export const AUTHORIZATION_HEADER = 'Authorization';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  /**
   * Constructor
   */
  constructor(private _authService: AuthService) {
  }

  /**
   * Intercept
   *
   * @param req
   * @param next
   */
  intercept(
      req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let newReq = req.clone();
    if (!req.url.startsWith('.') &&
        !req.url.startsWith(environment.apiUrl) &&
        !req.url.startsWith('assets')) {
      newReq = req.clone({
        url: `${environment.apiUrl}/${req.url}`,
      });
    }

    if (this._authService.accessToken !== null &&
        !AuthUtils.isTokenExpired(this._authService.accessToken)) {
      newReq = newReq.clone({
        headers: req.headers.set(AUTHORIZATION_HEADER,
            'Bearer ' + this._authService.accessToken),
      });
    }
    return next.handle(newReq).pipe(
        catchError((error) => {

          // Catch "401 Unauthorized" responses
          if (error instanceof HttpErrorResponse && error.status === 401) {
            // Sign out
            this._authService.signOut();

            // Reload the app
            location.reload();
          }

          return throwError(error);
        }),
    );
  }
}
