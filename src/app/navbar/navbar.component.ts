import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { User } from '../types';
import { WebSocketService } from '../web-socket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  // Valeur qui va être modifiée par la suite,
  // via le subscriber du currentUserSubject
  public currentUser: User | null = null;

  public notifications: string[] = [];

  constructor(private authenticationService: AuthenticationService, private ws: WebSocketService) { }

  ngOnInit(): void {
    console.log(this.authenticationService.currentUserValue);

    this.ws.notifSubject.subscribe((notif: string) => {
      this.notifications.push(notif);
    })

    this.authenticationService.currentUserSubject.subscribe((user: User | null) => {
      console.log('currentUserSubject subscriber receives value:', user);
      this.currentUser = user;
    });
  }

  logout() {
    this.authenticationService.logout();
  }

}
