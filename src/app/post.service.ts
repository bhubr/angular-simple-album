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
}
