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
    if (error.status === 0) {
      errorMessage = 'A network error occurred. Please come back later';
    } else if (error.status === 401) {
      errorMessage = 'You have been disconnected. Please login again';
      // ici on pourrait appeler logout sur authenticationService
      this.authenticationService.logout();
      // et rediriger l'utilisateur vers le login
      this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } })
    // erreurs dûes à des données incorrectes envoyées (par le serveur renvoie une 400 Bad Request)
    } else if(error.status === 403) {
      errorMessage = 'You are not allowed to do this';
    } else {
      errorMessage = 'An unexpected error occurred.';
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
