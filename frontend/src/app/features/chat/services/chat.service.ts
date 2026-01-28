import { inject, Injectable } from '@angular/core';
import { RxStomp } from '@stomp/rx-stomp';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Subscription} from 'rxjs';
import {MessageInterface} from '../interfaces/message.interface';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private http = inject(HttpClient);
  private rxStomp = new RxStomp();

  private messagesSubject = new BehaviorSubject<MessageInterface[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  private topicSubscription?: Subscription;


  constructor() {
    this.rxStomp.configure({
      brokerURL: 'ws://localhost:8080/ws',
      reconnectDelay: 200,
    });
    this.rxStomp.activate();
  }

  joinRoom(roomId: string) {

    if (this.topicSubscription) {
      this.topicSubscription.unsubscribe();
    }

    this.messagesSubject.next([]);

    this.http.get<MessageInterface[]>(`http://localhost:8080/messages/${roomId}`).subscribe({
      next: (history) => this.messagesSubject.next(history),
      error: (err) => console.error(err)
    });

    this.topicSubscription = this.rxStomp.watch(`/topic/chat/${roomId}`).subscribe((message) => {
      const data = JSON.parse(message.body) as MessageInterface;
      const current = this.messagesSubject.value;
      this.messagesSubject.next([...current, data]);
    });
  }

  sendMessage(roomId: string, content: string, sender: string) {
    const payload = { content, sender };
    this.rxStomp.publish({
      destination: `/app/chat/${roomId}`,
      body: JSON.stringify(payload),
    });
  }
}
