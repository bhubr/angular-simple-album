import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Post } from './types';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  // URL absolue
  serverUrl = 'https://album-api.benoithubert.me';
  // chemin relatif sur le serveur
  postsPath = '/api/v2/posts';

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }

  private getHeaders() {
    return this.authenticationService.token
      ? new HttpHeaders({ Authorization: `Bearer ${this.authenticationService.token}` })
      : new HttpHeaders();
  }

  getAllPosts(): Promise<Post[]> {
    return this.http
      .get<Post[]>(
        `${this.serverUrl}${this.postsPath}`
      )
      .toPromise();
  }

  getPost(postId: number): Promise<Post> {
    return this.http
      .get<Post>(
        `${this.serverUrl}${this.postsPath}/${postId}`
      )
      .toPromise();
  }

  createPost(postData: Partial<Post>): Promise<Post> {
    return this.http
      .post<Post>(
        `${this.serverUrl}${this.postsPath}`,
        postData,
        { headers: this.getHeaders() }
      )
      .toPromise();
  }

  deletePost(postId: number): Promise<{}> {
    return this.http
      .delete<{}>(
        `${this.serverUrl}${this.postsPath}/${postId}`,
      )
      .toPromise();
  }
}
