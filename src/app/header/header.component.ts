import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = "Application Album Angular";
  subtitle = "Apprendre les bases";

  constructor() { }

  ngOnInit(): void {
  }

}
