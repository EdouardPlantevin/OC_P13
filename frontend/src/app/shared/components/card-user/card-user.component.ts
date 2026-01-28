import {Component, input} from '@angular/core';
import {UserInterface} from '../../../interfaces/user.interface';

@Component({
  selector: 'app-card-user',
  imports: [],
  template: `
    <div class="card cursor-pointer animation-elevation">
      <div class="card-body">
        <h5 class="card-title">Select {{ user().name }} chat</h5>
        <p class="card-text">ID: {{ user().id }}</p>
      </div>
    </div>
  `,
})
export class CardUserComponent {

  user = input.required<UserInterface>();

}
