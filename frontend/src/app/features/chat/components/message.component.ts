import {Component, input} from '@angular/core';
import {MessageInterface} from '../interfaces/message.interface';

@Component({
  selector: 'app-message',
  imports: [],
  template: `
    <div class="d-flex mb-4" [class.flex-row-reverse]="message().owner">
      <div class="p-3 rounded-3 shadow-sm" style="max-width: 75%;" [class.bg-primary]="message().owner" [class.bg-white]="!message().owner" [class.text-white]="message().owner" [class.text-muted]="!message().owner">
        {{ message().content }}
        <div class="small text-end mt-1" [class.text-white-50]="message().owner">{{ message().times }}</div>
      </div>
    </div>
  `,
  styles: ``,
})
export class MessageComponent {
  message = input.required<MessageInterface>();
}
