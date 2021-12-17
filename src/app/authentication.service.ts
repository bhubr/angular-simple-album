import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from './types';

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
}
