import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AsyncPipe } from '@angular/common'; // <--- Ne pas oublier
import { MessageComponent } from './message.component';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat',
  standalone: true, // Assurez-vous d'être en standalone
  imports: [
    ReactiveFormsModule,
    MessageComponent,
    AsyncPipe // <--- Indispensable pour lire messages$
  ],
  template: `
    <div class="container py-5">
      <div class="card mx-auto" style="max-width: 600px; height: 80vh;">

        <div class="card-header bg-white py-3">
          <h5 class="mb-0">Discussion avec le support</h5>
        </div>

        <div class="card-body overflow-auto bg-light" style="flex-grow: 1; display: flex; flex-direction: column;">

          @for (message of messages$ | async; track $index) {
            <app-message [message]="message" />
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
  styles: ``,
})
export class ChatComponent implements OnInit {

  private readonly route = inject(ActivatedRoute);
  private readonly formBuilder = inject(FormBuilder);
  private readonly chatService = inject(ChatService); // Injection du service

  // Observable lié directement au template
  messages$ = this.chatService.messages$;

  readonly userId: string;

  constructor() {
    this.userId = this.route.snapshot.paramMap.get('userId') as string;
  }

  ngOnInit() {
    // Charge l'historique quand on arrive sur la page
    this.chatService.loadHistory();
  }

  chatForm = this.formBuilder.nonNullable.group({
    message: ['', [Validators.required, Validators.maxLength(255)]],
  });

  onSubmit() {
    const msg = this.chatForm.getRawValue().message;
    if (msg.trim()) {
      this.chatService.sendMessage(msg); // Envoi au backend
      this.chatForm.reset(); // Vide le champ
    }
  }
}
