import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { AuthenticationService } from './authentication.service';
import { Notification } from './types';

interface Message {
  type: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  public subject?: Subject<Message>;

  public notifSubject: Subject<string> = new Subject();

  serverUrl = 'http://localhost:5200';
  notifPath = '/api/v2/notifications';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token') || '';
    return token
      ? new HttpHeaders({ Authorization: `Bearer ${token}` })
      : new HttpHeaders();
  }

  connect() {
    this.subject = webSocket("ws://localhost:5200");

    this.subject.subscribe(
      ({ type, ...rest }: Message) => {
        console.log(type, rest);
        if (type === 'post:like') {
          this.notifSubject.next(`${rest.user.login} liked your post ${rest.post.title}`)
        }
        if (type === 'post:comment') {
          this.notifSubject.next(`${rest.user.email} commented your post ${rest.post.title}`)
        }
      }
    );
  }
  
  sendMessage(msg: Message) {
    this.subject!.next(msg);
  }

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(
      `${this.serverUrl}${this.notifPath}`,
      { headers: this.getHeaders() }
    )
  }
}
