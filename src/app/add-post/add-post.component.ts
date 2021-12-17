import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PostService } from '../post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup;

  constructor(private fb: FormBuilder, private postService: PostService) {
    this.postForm = this.fb.group({
      title: '',
      description: '',
      picture: '',
    })
  }

  ngOnInit(): void {
  }

  addPost() {
    const postData = this.postForm.value;
    // console.log et console.error sont juste temporaires
    // idéalement, on afficherait une notification de succès
    this.postService.createPost(postData)
      .then(post => {
        console.log(`post created with id ${post.id}`);
      })
      .catch(err => {
        console.error('Could not create post', err);
      })
  }

}
