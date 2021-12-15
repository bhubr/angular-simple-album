import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  addPostForm = this.formBuilder.group({
    title: '',
    description: '',
    picture: '',
    tags: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    this.postService.addPost(this.addPostForm.value)
    .then(console.log);
  }

  get splitTags(): string[] {
    return this.addPostForm.value.tags.split(',').filter((t: string) => !!t);
  }
}
