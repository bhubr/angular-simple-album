import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../types';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() post!: Post;

  likes = 0;

  constructor() { }

  ngOnInit(): void {
  }

  like() {
    this.likes += 1;
  }

}
