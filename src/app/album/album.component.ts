import { Component, OnInit } from '@angular/core';
import { POSTS } from '../posts';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  posts = POSTS
  constructor() { }

  ngOnInit(): void {
  }

}
