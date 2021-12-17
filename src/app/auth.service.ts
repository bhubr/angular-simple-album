import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { CredentialsPayload, TokenPayload, User } from './types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private serverUrl = 'http://localhost:5200';

  private basePath = '/api/v2/auth';

  private token = '';

  public currentUserSubject = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {
  }

  private endpoint(path: string) {
    const { serverUrl, basePath } = this;
    return `${serverUrl}${basePath}${path}`;
  }

  public getToken() {
    return this.token;
  }

  public register(credentials: CredentialsPayload): Promise<{}> {
    const url = this.endpoint('/register');
    return this.http.post<{}>(url, credentials)
      .toPromise();
  }

  public login(credentials: CredentialsPayload): Promise<TokenPayload> {
    const url = this.endpoint('/login');
    return this.http.post<TokenPayload>(url, credentials)
      .toPromise()
      .then(data => {
        this.token = data.token;
        this.currentUserSubject.next(data.user);
        this.router.navigate(['']);
        return data;
      });
  }
}
