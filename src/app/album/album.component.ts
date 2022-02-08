import { Component, OnInit } from '@angular/core';

import { Post } from '../types';
import { PostService } from '../post.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getAllPosts()
      .subscribe(posts => {
        this.posts = posts;
      });
  }

  updatePost(updatedPost: Post) {
    // this.posts.forEach(post => {
    //   if (post.id === updatedPost.id) {
    //     post.likes = updatedPost.likes;
    //   }
    // });

    this.posts = this.posts.map(
      post => post.id === updatedPost.id
        ? updatedPost
        : post
    );

    // const updatedPostIndex = this.posts.findIndex(
    //   post => post.id === updatedPost.id
    // );
    // this.posts.splice(updatedPostIndex, 1, updatedPost);
  }

}
