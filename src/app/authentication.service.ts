import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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

  public register(login: string, pwd: string): Observable<{}> {
    return this.http.post<{}>(`${this.serverUrl}${this.registerPath}`, {
      login,
      pwd,
    });
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
