import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Post } from './types';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  // URL absolue
  serverUrl = 'https://album-api.benoithubert.me';
  // chemin relatif sur le serveur
  postsPath = '/api/posts';

  constructor(private http: HttpClient) { }

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
