import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CustomerService } from './services/customer.service';
import { UserInterface } from '../../interfaces/user.interface';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <div class="container my-5">
      <h1 class="mb-5">Qui êtes-vous ?</h1>

      <div class="row g-4">
        <div class="col-md-6">
          <div class="card p-3 mb-3">
            <h5>Clients</h5>
            @if (customers().length > 0) {
              @for (customer of customers(); track customer.id) {
                <button class="btn btn-primary w-100 mb-2" [routerLink]="['/chat', customer.id, customer.id]">
                  Je suis {{ customer.name.split(' ')[0] }}
                </button>
              }
            } @else if (loading()) {
              <p class="text-muted">Chargement...</p>
            } @else {
              <p class="text-muted">Aucun client</p>
            }
          </div>
        </div>

        <div class="col-md-6">
          <div class="card p-3 mb-3 border-danger">
            <h5 class="text-danger">Espace Support (ID 4)</h5>
            <p>Qui voulez-vous aider ?</p>

            @if (customers().length > 0) {
              @for (customer of customers(); track customer.id) {
                <button class="btn btn-outline-danger w-100 mb-2" [routerLink]="['/chat', '4', customer.id]">
                  Aider {{ customer.name.split(' ')[0] }}
                </button>
              }
            } @else if (loading()) {
              <p class="text-muted">Chargement...</p>
            }
          </div>
        </div>
      </div>
    </div>
  `,
})
export class HomeComponent implements OnInit {
  private readonly customerService = inject(CustomerService);

  customers = signal<UserInterface[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.customerService.getCustomers().subscribe({
      next: (list) => {
        this.customers.set(list);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
