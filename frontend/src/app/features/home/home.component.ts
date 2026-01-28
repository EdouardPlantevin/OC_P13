import { Component } from '@angular/core';
import {UserInterface} from '../../interfaces/user.interface';
import {CardUserComponent} from '../../shared/components/card-user/card-user.component';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    CardUserComponent,
    RouterLink
  ],
  template: `

    <div class="container my-5">

      <h1 class="my-5">Choisir un utilisateur, le 4 étant le Support</h1>

      <div class="row g-4">
        @for (user of mockUsers; track user.id) {
          <div class="col-12 col-md-6">
            <app-card-user [user]="user" routerLink="/chat/{{ user.id }}" />
          </div>
        }
      </div>

    </div>

  `,
})
export class HomeComponent {

  mockUsers: UserInterface[] = [
    { id: '1', name: 'Customer Edouard' },
    { id: '2', name: 'Customer Bob' },
    { id: '3', name: 'Customer Charlie' },
    { id: '4', name: 'Support' },
  ];

}
