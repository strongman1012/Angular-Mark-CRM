import { Injectable } from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from "@angular/common/http";
import { catchError, Observable, of, switchMap, throwError } from "rxjs";
import { environment } from "../../environments/environment";
import { NotificationService } from "../shared/notification.service";

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let newReq = req.clone();
    if (
      !req.url.startsWith(".") &&
      !req.url.startsWith(environment.apiUrl) &&
      !req.url.startsWith("assets")
    ) {
      newReq = req.clone({
        url: `${environment.apiUrl}/${req.url}`,
      });
    }
    if (!newReq.url.startsWith(environment.apiUrl)) {
      return next.handle(newReq);
    }

    if (!environment.production) {
      if (newReq.body) {
      }
    }

    return next.handle(newReq).pipe(
      catchError((error: HttpErrorResponse) => this.showUnhandledError(error)),

      switchMap((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse && !environment.production) {
          this.logBody(event.body);
        }
        if (event instanceof HttpResponse && event.body["success"] === false) {
          const error = new HttpErrorResponse({
            status: 400,
            error: event.body,
            statusText: "OK",
            headers: event.headers,
            url: event.url,
          });

          return throwError(() => error);
        }
        return of<any>(event);
      })
    );
  }

  private logBody(body: any): void {}

  private showUnhandledError(error: HttpErrorResponse) {
    this.notificationService.error(
      "Unhandled error occurred. Details: " + error.error
    );
    return throwError(() => error);
  }
}
