import { Injectable } from '@angular/core';
import { Post } from './types';
import { POSTS } from './posts';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  // URL absolue
  // serverUrl = 'https://album-api.benoithubert.me';
  serverUrl = 'http://localhost:5200';
  // chemin relatif sur le serveur
  postsPath = '/api/posts';
  // chemin relatif sur le serveur
  postsProtectedPath = '/api/v2/posts';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    if (token) {
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }
    return new HttpHeaders();
  }

  getAllPosts(): Promise<Post[]> {
    return this.http
      .get<Post[]>(
        `${this.serverUrl}${this.postsPath}`
      )
      .toPromise();
  }

  getPost(id: number): Promise<Post> {
    return this.http
      .get<Post>(
        `${this.serverUrl}${this.postsPath}/${id}`
      )
      .toPromise();
  }

  addPost(post: Partial<Post>) {
    return this.http
      .post(`${this.serverUrl}${this.postsProtectedPath}`, post, {
        headers: this.getHeaders()
      })
      .toPromise();
  }

  likePost(postId: number) {
    return this.http
      .put(`${this.serverUrl}${this.postsPath}/${postId}/like`, {})
      .toPromise();
  }

  deletePost(postId: number) {
    return this.http
      .delete(`${this.serverUrl}${this.postsPath}/${postId}`)
      .toPromise();
  }

}