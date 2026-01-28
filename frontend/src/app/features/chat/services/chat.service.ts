import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import { RxStomp } from '@stomp/rx-stomp';
import {BackendMessage, MessageInterface} from '../interfaces/message.interface';



@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private http=  inject(HttpClient);
  private rxStomp = new RxStomp();

  private messagesSubject = new BehaviorSubject<BackendMessage[]>([])
  public messages$ = this.messagesSubject.asObservable();

  constructor() {
    this.rxStomp.configure({
      brokerURL: 'ws://localhost:8080/ws',
      reconnectDelay: 200,
    });

    this.rxStomp.activate();

    this.rxStomp.watch('/topic/public').subscribe((message) => {
      const data = JSON.parse(message.body) as BackendMessage;
      const current = this.messagesSubject.value;
      this.messagesSubject.next([...current, data]);
    });
  }

  loadHistory() {
    this.http.get<BackendMessage[]>('http://localhost:8080/messages').subscribe({
      next: (history) => this.messagesSubject.next(history),
      error: (err) => console.error('Erreur chargement historique', err)
    });
  }

  sendMessage(content: string, sender: 'USER' | 'SUPPORT') {
    const payload = { content, sender };
    this.rxStomp.publish({
      destination: '/app/chat.sendMessage',
      body: JSON.stringify(payload),
    });
  }
}
