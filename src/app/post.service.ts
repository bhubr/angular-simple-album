import { Injectable } from '@angular/core';
import { Post } from './types';
import { POSTS } from './posts';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  // URL absolue
  // serverUrl = 'https://album-api.benoithubert.me';
  serverUrl = 'http://localhost:5200';
  // chemin relatif sur le serveur
  postsPath = '/api/posts';

  constructor(
    private http: HttpClient
  ) { }

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
      .post(`${this.serverUrl}${this.postsPath}`, post)
      .toPromise();
  }

  deletePost(postId: number) {
    return this.http
      .delete(`${this.serverUrl}${this.postsPath}/${postId}`)
      .toPromise();
  }
  
}