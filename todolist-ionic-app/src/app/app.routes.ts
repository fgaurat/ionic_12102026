import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home2',
    loadComponent: () => import('./home2/home2.page').then((m) => m.Home2Page),
  },
  {
    path: 'preferences',
    loadComponent: () =>
      import('./preferences/preferences.page').then((m) => m.PreferencesPage),
  },
  {
    path: 'theme',
    loadComponent: () => import('./theme/theme.page').then((m) => m.ThemePage),
  },
  {
    path: 'todo/:id',
    loadComponent: () => import('./todo/todo.page').then((m) => m.TodoPage),
  },
];
