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

  getPost(id: number): Post | undefined {
    return POSTS.find(item => id === item.id);
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