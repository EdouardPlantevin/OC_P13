import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'chat/:userId/:roomId',
    loadComponent: () => import('./features/chat/components/chat.component').then(m => m.ChatComponent),
  }
];
