import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {
  posts = [
      {
      picture: 'https://unsplash.com/photos/JH0wCegJsrQ/download?force=true&w=640',
      title: 'La nuit',
      description: "C'est beau une ville la nuit !"
    },
    {
      picture: 'https://unsplash.com/photos/1kf69eE7VR4/download?force=true&w=640',
      title: 'San Francisco',
      description: "Le Golden Gate !"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
