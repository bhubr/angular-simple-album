import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../types';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  post?: Post;

  commentForm: FormGroup;

  constructor(
    private postService: PostService,
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.commentForm = this.fb.group({
      text: ''
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.postService.getPost(id).subscribe({
      next: (post: Post) => {
        this.post = post;
      },
      error: (error: string) => {
        // TODO: ajouter un attribut error et lui assigner error, et l'afficher
        console.error(error);
      }
    });
  }

  onSubmit() {
    const comment = this.commentForm.value
    this.postService.comment(this.post!.id, comment)
      .subscribe(val => console.log(val))
  }
}
