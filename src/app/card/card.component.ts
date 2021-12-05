import { Component, OnInit, Input } from '@angular/core';

// La classe permet de décrire les attributs
// de l'objet `post` passé depuis le parent
class Post {
  title!: string;
  description!: string;
  picture!: string;
}

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() post!: Post;

  constructor() { }

  ngOnInit(): void {
  }

}
