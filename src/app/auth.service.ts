import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CredentialsPayload, TokenPayload } from './types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  serverUrl = 'http://localhost:5200';
  basePath = '/api/v2/auth';
  token = '';

  constructor(private http: HttpClient) { }

  endpoint(path: string) {
    const { serverUrl, basePath } = this;
    return `${serverUrl}${basePath}${path}`;
  }

  register(credentials: CredentialsPayload): Promise<{}> {
    const url = this.endpoint('/register');
    return this.http.post<{}>(url, credentials)
      .toPromise();
  }

  login(credentials: CredentialsPayload): Promise<TokenPayload> {
    const url = this.endpoint('/login');
    return this.http.post<TokenPayload>(url, credentials)
      .toPromise()
      .then(data => {
        this.token = data.token;
        return data;
      });
  }
}
