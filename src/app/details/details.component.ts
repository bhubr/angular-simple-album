import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(
    // concept qu'on retrouve dans beaucoup de frameworks
    // orientés objet appelé "injection de dépendances"
    private route: ActivatedRoute,
    private location: Location
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(id)
  }

  ngOnInit(): void {
  }

}
