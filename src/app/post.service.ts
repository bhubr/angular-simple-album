import { Injectable } from '@angular/core';
import { Post } from './types';
import { POSTS } from './posts';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }

  getAllPosts(): Post[] {
    return POSTS;
  }
}
