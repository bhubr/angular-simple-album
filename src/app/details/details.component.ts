import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { POSTS } from '../posts';
import { Post } from '../types';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  post?: Post;

  constructor(
    // concept qu'on retrouve dans beaucoup de frameworks
    // orientés objet appelé "injection de dépendances"
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.post = POSTS.find(item => id === item.id);
    console.log(this.post);
  }

}
