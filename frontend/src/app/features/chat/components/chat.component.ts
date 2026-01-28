import {Component, inject} from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {MessageComponent} from './message.component';
import {MessageInterface} from '../interfaces/message.interface';

@Component({
  selector: 'app-chat',
  imports: [
    ReactiveFormsModule,
    MessageComponent
  ],
  template: `
    <div class="container py-5">
      <div class="card mx-auto" style="max-width: 600px; height: 80vh;">

        <div class="card-header bg-white py-3">
          <h5 class="mb-0">Discussion avec le support</h5>
        </div>

        <div class="card-body overflow-auto bg-light" style="flex-grow: 1;">
          @for (message of mockMessages; track $index) {
            <app-message [message]="message" />
          }
        </div>

        <div class="card-footer bg-white border-top-0 p-3">
          <form [formGroup]="chatForm" (ngSubmit)="onSubmit()">
            <div class="input-group">
              <input formControlName="message" type="text" class="form-control border-0 bg-light" placeholder="Écrivez votre message..." aria-label="Message">
              <button class="btn btn-primary px-4" type="button">
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
export class ChatComponent {

  private readonly route = inject(ActivatedRoute);
  private readonly formBuilder = inject(FormBuilder);

  readonly userId: string;

  mockMessages: MessageInterface[] = [
    { content: 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?', times: '09:41', owner: true },
    { content: 'Bonjour, j\'ai cassé la voiture en essayant de faire un tonneau.', times: '09:42', owner: false },
    { content: 'C\'est génial. vous êtes assuré pour les tonneaux', times: '09:43', owner: true },
  ];

  constructor() {
    this.userId = this.route.snapshot.paramMap.get('userId') as string;
  }

  chatForm = this.formBuilder.nonNullable.group({
    message: ['', [Validators.required, Validators.maxLength(255)]],
  });

  onSubmit() {
    console.log('Message envoyé :', this.chatForm.value.message);
  }
}
