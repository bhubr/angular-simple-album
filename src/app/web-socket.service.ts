import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { webSocket } from "rxjs/webSocket";

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
}
