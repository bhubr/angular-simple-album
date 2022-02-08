import { Component, OnInit, Input } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../types';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() post!: Post;

  error = '';

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  like() {
    console.log('post likes before ->', this.post.likes);
    this.postService.likePost(this.post.id)
      .subscribe({
        next: (updatedPost: Post) => {
          console.log('post updated -> ', updatedPost.likes)
        },
        error: (error) => {
          this.error = error;
        }
      })
  }

  delete() {
    this.postService.deletePost(this.post.id)
    .subscribe({
      next: () => console.log('post deleted'),
      error: (error) => {
        this.error = error;
      }
    })
  }

}
