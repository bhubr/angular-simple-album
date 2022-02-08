import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // On a besoin d'ajouter le header Authorization *seulement si*
    // un utilisateur est connecté, et qu'on fait une requête vers notre
    // propre API (par opposition à une API tierce)
    if (
      this.authenticationService.currentUserValue
      // TODO: supprimer la valeur hardcodée (utiliser un environment)
      && request.url.startsWith('https://album-api.benoithubert.me')
    ) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${this.authenticationService.token}`)
      });
    }
    return next.handle(request);
  }
}
