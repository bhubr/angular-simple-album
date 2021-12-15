import { Component, OnInit } from '@angular/core';
import { Post } from '../types';
import { PostService } from '../post.service';

type SortBy = 'date' | 'title' | 'likes';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  allPosts: Post[] = [];

  sortBy: SortBy = "date";
  
  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.postService.getAllPosts()
      .then(posts => {
        this.allPosts = posts;
      });
  }

  get sortFn() {
    const sortFns = {
      date: (a: Post, b: Post) => {
        return b.createdAt.toString().localeCompare(a.createdAt.toString());
      },
      likes: (a: Post, b: Post) => b.likes - a.likes,
      title: (a: Post, b: Post) => a.title.localeCompare(b.title),
    }
    return sortFns[this.sortBy];
  }

  get posts(): Post[] {
    return this.allPosts.sort(
      this.sortFn
    )
  }

}