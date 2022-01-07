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

  likes = 0;

  error = '';

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  like() {
    this.likes += 1;
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
