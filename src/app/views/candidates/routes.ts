import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: ''
    },
    children: [
      {
        path: '',
        redirectTo: 'candidates',
        pathMatch: 'full'
      },
      {
        path: 'candidates',
        loadComponent: () => import('./candidates.component').then(m => m.CandidatesComponent),
        data: {
          title: 'Candidates'
        }
      },
    ]
  }
];

