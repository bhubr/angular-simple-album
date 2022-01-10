import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Post } from './types';
import { AuthenticationService } from './authentication.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  // URL absolue
  // serverUrl = 'https://album-api.benoithubert.me';
  serverUrl = 'http://localhost:5200';
  // chemin relatif sur le serveur
  postsPath = '/api/v2/posts';

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    // pas nécessaire si on utilise une fonction fléchée dans catchError() 
    // this.handleError = this.handleError.bind(this);
  }

  private getHeaders() {
    console.log(this.authenticationService.currentUserValue, this.authenticationService.token)
    return this.authenticationService.token
      ? new HttpHeaders({ Authorization: `Bearer ${this.authenticationService.token}` })
      : new HttpHeaders();
  }

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
      errorMessage = 'You are not the owner of this post';
    } else if (error.status === 404) {
      errorMessage = 'This post does not exist anymore.';
    } else if (error.status === 400) {
      errorMessage = 'There are missing or misformated fields.';
    } else {
      errorMessage = 'An unexpected error occurred.';
    }
    return throwError(errorMessage);
  }

  getAllPosts(): Promise<Post[]> {
    return this.http
      .get<Post[]>(
        `${this.serverUrl}${this.postsPath}`
      )
      .toPromise();
  }

  getPost(postId: number): Observable<Post> {
    return this.http
      .get<Post>(
        `${this.serverUrl}${this.postsPath}/${postId}`
      )
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  createPost(postData: Partial<Post>): Observable<Post> {
    return this.http
      .post<Post>(
        `${this.serverUrl}${this.postsPath}`,
        postData,
        { headers: this.getHeaders() }
      )
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  deletePost(postId: number): Observable<{}> {
    return this.http
      .delete<{}>(
        `${this.serverUrl}${this.postsPath}/${postId}`,
        { headers: this.getHeaders() }
      )
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  likePost(postId: number): Observable<{}> {
    return this.http
      .put<{}>(
        `${this.serverUrl}${this.postsPath}/${postId}/like`,
        {},
        { headers: this.getHeaders() }
      )
      .pipe(
        catchError(error => this.handleError(error))
      );
  }
}
