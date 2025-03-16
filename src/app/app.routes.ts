import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    loadComponent: () =>
      import(
        './features/user/pages/user-list-page/user-list-page.component'
      ).then((m) => m.UserListPageComponent),
  },
  {
    path: 'users/:id',
    loadComponent: () =>
      import(
        './features/user/pages/user-detail-page/user-detail-page.component'
      ).then((m) => m.UserDetailPageComponent),
  },
  {
    path: '**',
    redirectTo: 'users',
  },
];
