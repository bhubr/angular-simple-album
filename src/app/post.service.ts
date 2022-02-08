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
  serverUrl = 'https://album-api.benoithubert.me';
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

  private handleError(error: HttpErrorResponse | string) {
    // TODO: trouver une façon plus élégante
    if (typeof error === 'string') {
      return throwError(error);
    }
    let errorMessage = '';
    switch (error.status) {
      case 0:
        errorMessage = 'A network error occurred. Please come back later';
        break;
      case 400:
        errorMessage = 'There are missing or misformated fields.';
        break;
      case 404:
        errorMessage = 'This post does not exist anymore.';
        break;
      default:
        errorMessage = 'An unexpected error occurred.';
    }
    return throwError(errorMessage);
  }

  getAllPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(
        `${this.serverUrl}${this.postsPath}`
      );
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
      )
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  deletePost(postId: number): Observable<void> {
    return this.http
      .delete<void>(
        `${this.serverUrl}${this.postsPath}/${postId}`,
      )
      .pipe(
        catchError(error => this.handleError(error))
      );
  }

  likePost(postId: number): Observable<Post> {
    return this.http
      .put<Post>(
        `${this.serverUrl}${this.postsPath}/${postId}/like`,
        {}
      )
      .pipe(
        catchError(error => this.handleError(error))
      );
  }
}
