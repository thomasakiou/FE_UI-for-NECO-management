import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'users',
    loadComponent: () => import('./users/users.component').then(m => m.UsersComponent),
    data: {
      title: 'Manage User'
    }
  },
  {
    path: 'roles',
    loadComponent: () => import('./roles/roles.component').then(m => m.RolesComponent),
    data: {
      title: 'Manage Roles'
    }
  },
  {
    path: 'permissions',
    loadComponent: () => import('./permissions/permissions.component').then(m => m.PermissionsComponent),
    data: {
      title: 'Manage Permissions'
    }
  }
];

