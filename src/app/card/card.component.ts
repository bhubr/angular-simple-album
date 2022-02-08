import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostService } from '../post.service';
import { Post } from '../types';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  /**
   * post passé depuis le composant parent
   */
  @Input() post!: Post;

  /**
   * event emitter pour transmettre le post màj au composant parent
   */
  @Output() postUpdatedEvent = new EventEmitter<Post>();

  /**
   * event emitter pour transmettre l'id du post effacé au parent.
   * On n'a PAS BESOIN de transmettre tout le post effacé : le parent
   * a juste besoin de connaître son id. D'où le typage avec number.
   */
  @Output() postDeletedEvent = new EventEmitter<number>();

  error = '';

  constructor(private postService: PostService) { }

  ngOnInit(): void {
  }

  like() {
    this.postService.likePost(this.post.id)
      .subscribe({
        next: (updatedPost: Post) => {
          this.postUpdatedEvent.emit(updatedPost);
        },
        error: (error) => {
          this.error = error;
        }
      })
  }

  delete() {
    this.postService.deletePost(this.post.id)
    .subscribe({
      next: () => {
        this.postDeletedEvent.emit(this.post.id);
      },
      error: (error) => {
        this.error = error;
      }
    })
  }

}
