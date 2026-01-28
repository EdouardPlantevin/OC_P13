import {Component, Input, input} from '@angular/core';
import {MessageInterface} from '../interfaces/message.interface';

@Component({
  selector: 'app-message',
  imports: [],
  template: `
    <div class="d-flex mb-4" [class.flex-row-reverse]="isMine()">
      <div class="p-3 rounded-3 shadow-sm" style="max-width: 75%;" [class.bg-primary]="isMine()" [class.bg-white]="!isMine()" [class.text-white]="isMine()" [class.text-muted]="!isMine()">
        {{ message().content }}
        <div class="small text-end mt-1" [class.text-white-50]="isMine()">{{ message().times }}</div>
      </div>
    </div>
  `,
  styles: ``,
})
export class MessageComponent {
  message = input.required<MessageInterface>();
  isMine = input.required<boolean>();
}
