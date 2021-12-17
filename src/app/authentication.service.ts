import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, TokenUserPayload } from './types';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

    // URL absolue
    serverUrl = 'https://album-api.benoithubert.me';
    // chemin relatif sur le serveur
    registerPath = '/api/v2/auth/register';
    loginPath = '/api/v2/auth/login';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public register(login: string, pwd: string): Observable<{}> {
    return this.http.post<{}>(
      `${this.serverUrl}${this.registerPath}`,
      { login, pwd }
    );
  }

  public login(login: string, pwd: string): Observable<TokenUserPayload> {
    return this.http.post<TokenUserPayload>(
      `${this.serverUrl}${this.loginPath}`,
      { login, pwd }
    ).pipe(map((payload: TokenUserPayload) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem('token', payload.token);
      localStorage.setItem('currentUser', JSON.stringify(payload.user));

      this.currentUserSubject.next(payload.user);
      return payload;
  }));
  }
}
