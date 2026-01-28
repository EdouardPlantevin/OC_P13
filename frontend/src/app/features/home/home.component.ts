import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink
  ],
  template: `
    <div class="container my-5">
      <h1 class="mb-5">Qui êtes-vous ?</h1>

      <div class="row g-4">
        <div class="col-md-6">
          <div class="card p-3 mb-3">
            <h5>Clients</h5>
            <button class="btn btn-primary w-100 mb-2" routerLink="/chat/1/1">
              Je suis Edouard
            </button>
            <button class="btn btn-info w-100" routerLink="/chat/3/3">
              Je suis Adele
            </button>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card p-3 mb-3 border-danger">
            <h5 class="text-danger">Espace Support (ID 4)</h5>
            <p>Qui voulez-vous aider ?</p>

            <button class="btn btn-outline-danger w-100 mb-2" routerLink="/chat/4/1">
              Aider Edouard
            </button>

            <button class="btn btn-outline-danger w-100" routerLink="/chat/4/3">
              Aider Adele
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class HomeComponent {}
