import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import { RxStomp } from '@stomp/rx-stomp';
import {MessageInterface} from '../interfaces/message.interface';



@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private http=  inject(HttpClient);
  private rxStomp = new RxStomp();

  private messagesSubject = new BehaviorSubject<MessageInterface[]>([])
  public messages$ = this.messagesSubject.asObservable();

  constructor() {
    this.rxStomp.configure({
      brokerURL: 'ws://localhost:8080/ws',
      reconnectDelay: 200,
    });

    this.rxStomp.activate();

    this.rxStomp.watch('/topic/public').subscribe((message) => {
      const data = JSON.parse(message.body);
      const newMessage: MessageInterface = this.mapToMessageInterface(data);

      const currentMessages = this.messagesSubject.value;
      this.messagesSubject.next([...currentMessages, newMessage]);
    });
  }

  loadHistory() {
    this.http.get<any[]>('http://localhost:8080/messages').subscribe({
      next: (history) => {
        const mappedHistory = history.map(msg => this.mapToMessageInterface(msg));
        this.messagesSubject.next(mappedHistory);
      },
      error: (err) => console.error('Impossible de charger l\'historique', err)
    });
  }

  sendMessage(content: string) {
    const payload = { content, sender: 'USER' };
    this.rxStomp.publish({
      destination: '/app/chat.sendMessage',
      body: JSON.stringify(payload),
    });
  }


  private mapToMessageInterface(data: any): MessageInterface {
    return {
      content: data.content,
      times: data.times,
      owner: data.sender === 'USER'
    };
  }
}
