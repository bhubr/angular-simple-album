import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  post1 = {
    picture: 'https://unsplash.com/photos/JH0wCegJsrQ/download?force=true&w=640',
    title: 'La nuit',
    description: "C'est beau une ville la nuit !"
  }

  constructor() { }

  ngOnInit(): void {
  }

}
