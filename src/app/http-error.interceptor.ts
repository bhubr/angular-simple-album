import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    switch (error.status) {
      case 0:
        errorMessage = 'A network error occurred. Please come back later';
        break;
      case 401:
        errorMessage = 'You have been disconnected. Please login again';
        // ici on pourrait appeler logout sur authenticationService
        this.authenticationService.logout();
        // et rediriger l'utilisateur vers le login
        this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } })
        break;
      case 403:
        errorMessage = 'You are not allowed to do this';
        break;
      default:
        return throwError(error);
    }
    return throwError(errorMessage);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
      .pipe(
        catchError(error => this.handleError(error))
      );
  }
}
