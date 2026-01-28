import { Component, ElementRef, inject, OnInit, ViewChild, AfterViewChecked } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { map, Observable, tap } from 'rxjs'; // Import de 'tap'

import { MessageComponent } from './message.component';
import { MessageInterface } from '../interfaces/message.interface';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MessageComponent,
    AsyncPipe
  ],
  template: `
    <div class="container py-5">
      <div class="card mx-auto" style="max-width: 600px; height: 80vh;">

        <div class="card-header bg-white py-3">
          <h5 class="mb-0">
            @if (myRole === 'SUPPORT') {
              Espace Support (Client: Edouard)
            } @else {
              Discussion avec le Support
            }
          </h5>
        </div>

        <div #scrollContainer class="card-body overflow-auto bg-light" style="flex-grow: 1; display: flex; flex-direction: column;">
          @for (message of messages$ | async; track $index) {
            <app-message [message]="message" [isMine]="message.sender === myRole" />
          }
        </div>

        <div class="card-footer bg-white border-top-0 p-3">
          <form [formGroup]="chatForm" (ngSubmit)="onSubmit()">
            <div class="input-group">
              <input formControlName="message" type="text" class="form-control border-0 bg-light" placeholder="Écrivez votre message..." aria-label="Message">
              <button class="btn btn-primary px-4" type="submit" [disabled]="!chatForm.valid">
                Envoyer
              </button>
            </div>
          </form>
        </div>

      </div>
    </div>
  `,
})
export class ChatComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly chatService = inject(ChatService);

  readonly userId: string;
  myRole: 'USER' | 'SUPPORT';

  messages$: Observable<MessageInterface[]>;

  // Récupération de l'élément HTML du container
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  constructor() {
    this.userId = this.route.snapshot.paramMap.get('userId') as string;
    this.myRole = (this.userId === '2') ? 'SUPPORT' : 'USER';

    this.messages$ = this.chatService.messages$.pipe(tap(() => this.scrollToBottom()));
  }

  ngOnInit() {
    this.chatService.loadHistory();
    this.scrollToBottom();
  }

  chatForm = this.fb.nonNullable.group({
    message: ['', [Validators.required, Validators.maxLength(255)]],
  });

  onSubmit() {
    const msg = this.chatForm.getRawValue().message;
    if (msg.trim()) {
      this.chatService.sendMessage(msg, this.myRole);
      this.chatForm.reset();
      this.scrollToBottom();
    }
  }

  private scrollToBottom(): void {
    setTimeout(() => {
      if (this.scrollContainer) {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      }
    }, 50);
  }
}
