import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login.component').then((m) => m.LoginComponent),
    data: {
      title: 'Login'
    }
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];


