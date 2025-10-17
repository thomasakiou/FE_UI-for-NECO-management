import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { AuthGuard } from './views/services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./views/auth/login/login.component').then((m) => m.LoginComponent),
    data: { title: 'Login' }
  },
  {
    path: '',
    loadComponent: () =>
      import('./layout').then((m) => m.DefaultLayoutComponent),
    // canActivate: [AuthGuard],
    data: { title: 'Home' },
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/routes').then((m) => m.routes),
        // canActivate: [() => inject(AuthGuard).canActivate]
      },
      {
        path: 'schools',
        loadChildren: () =>
          import('./views/schools/routes').then((m) => m.routes),
        // canActivate: [() => inject(AuthGuard).canActivate]
      },
      {
        path: 'candidates',
        loadChildren: () =>
          import('./views/candidates/routes').then((m) => m.routes),
        // canActivate: [() => inject(AuthGuard).canActivate]
      }
    ]
  },
  { path: '**', redirectTo: 'login' }
];



// export const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'dashboard',
//     pathMatch: 'full'
//   },
//   {
//     path: '',
//     loadComponent: () => import('./layout').then(m => m.DefaultLayoutComponent),
//     data: {
//       title: 'Home'
//     },
//     children: [
//       {
//         path: 'dashboard',
//         loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes),
//         canActivate: [() => inject(AuthGuard).canActivate]
//       },
//       {
//         path: 'schools',
//         loadChildren: () => import('./views/schools/routes').then((m) => m.routes),
//         canActivate: [() => inject(AuthGuard).canActivate]
//       },
//       {
//         path: 'candidates',
//         loadChildren: () => import('./views/candidates/routes').then((m) => m.routes),
//         canActivate: [() => inject(AuthGuard).canActivate]
//       },
//     ]
//   },
//
//   {
//     path: 'login',
//     loadComponent: () => import('./views/auth/login/login.component').then(m => m.LoginComponent),
//     data: {
//       title: 'Login'
//     }
//   },
//
//
//   //     {
//   //       path: 'base',
//   //       loadChildren: () => import('./views/base/routes').then((m) => m.routes)
//   //     },
//   //     {
//   //       path: 'buttons',
//   //       loadChildren: () => import('./views/buttons/routes').then((m) => m.routes)
//   //     },
//   //     {
//   //       path: 'forms',
//   //       loadChildren: () => import('./views/forms/routes').then((m) => m.routes)
//   //     },
//   //     {
//   //       path: 'icons',
//   //       loadChildren: () => import('./views/icons/routes').then((m) => m.routes)
//   //     },
//   //     {
//   //       path: 'notifications',
//   //       loadChildren: () => import('./views/notifications/routes').then((m) => m.routes)
//   //     },
//   //     {
//   //       path: 'widgets',
//   //       loadChildren: () => import('./views/widgets/routes').then((m) => m.routes)
//   //     },
//   //     {
//   //       path: 'charts',
//   //       loadChildren: () => import('./views/charts/routes').then((m) => m.routes)
//   //     },
//   //     {
//   //       path: 'pages',
//   //       loadChildren: () => import('./views/pages/routes').then((m) => m.routes)
//   //     }
//   //   ]
//   // },
//   // {
//   //   path: '404',
//   //   loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
//   //   data: {
//   //     title: 'Page 404'
//   //   }
//   // },
//   // {
//   //   path: '500',
//   //   loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
//   //   data: {
//   //     title: 'Page 500'
//   //   }
//   // },
//   // {
//   //   path: 'login',
//   //   loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
//   //   data: {
//   //     title: 'Login Page'
//   //   }
//   // },
//   // {
//   //   path: 'register',
//   //   loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
//   //   data: {
//   //     title: 'Register Page'
//   //   }
//   // },
//   { path: '**', redirectTo: 'dashboard' }
// ];
