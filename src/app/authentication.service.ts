import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User, TokenUserPayload } from './types';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public currentUserSubject: BehaviorSubject<User | null>;

  public token: string = localStorage.getItem('token') || '';

  // URL absolue
  serverUrl = 'https://album-api.benoithubert.me';
  // chemin relatif sur le serveur
  registerPath = '/api/v2/auth/register';
  loginPath = '/api/v2/auth/login';

  constructor(private http: HttpClient) {
    const storedUserJSON = localStorage.getItem('currentUser');
    const storedUser = storedUserJSON ? JSON.parse(storedUserJSON) : null;
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser
    );
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  /**
   * Error handler
   * @param error error response
   * @returns 
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = 'A network error occurred. Please come back later';
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      const errorMessages = error.error.errors.map(
        (item: { msg: string }) => item.msg
      )
     errorMessage = errorMessages.join('. ');
    }
    // Return an observable with a user-facing error message.
    return throwError(errorMessage);
  }

  public register(login: string, pwd: string): Observable<{}> {
    return this.http.post<{}>(`${this.serverUrl}${this.registerPath}`, {
      login,
      pwd,
    })
    .pipe(
      catchError(this.handleError)
    );
  }

  public login(login: string, pwd: string): Observable<TokenUserPayload> {
    return this.http
      .post<TokenUserPayload>(`${this.serverUrl}${this.loginPath}`, {
        login,
        pwd,
      })
      .pipe(
        map((payload: TokenUserPayload) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('token', payload.token);
          localStorage.setItem('currentUser', JSON.stringify(payload.user));

          // On dit au currentUserSubject d'émettre commme valeur
          // l'objet représentant l'user (id et login)
          this.currentUserSubject.next(payload.user);
          this.token = payload.token;
          return payload;
        })
      );
  }

  logout() {
    this.currentUserSubject.next(null);
    this.token = '';
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }
}
