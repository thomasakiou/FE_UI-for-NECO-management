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
        redirectTo: 'schools',
        pathMatch: 'full'
      },
      {
        path: 'schools',
        loadComponent: () => import('./schools.component').then(m => m.SchoolsComponent),
        data: {
          title: 'Schools'
        }
      },
      // {
      //   path: 'typography',
      //   loadComponent: () => import('./typography.component').then(m => m.TypographyComponent),
      //   data: {
      //     title: 'Typography'
      //   }
      // }
    ]
  }
];

