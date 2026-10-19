import { Routes } from '@angular/router';
import { Shell } from './shell/shell';
import { authGuard, rolGuard } from './core/guards';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./login/login').then((m) => m.Login),
  },
  {
    path: '',
    component: Shell,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        canActivate: [rolGuard('admin', 'tecnico')],
        loadComponent: () => import('./dashboard/dashboard').then((m) => m.Dashboard),
      },
      {
        path: 'incidencias',
        loadComponent: () => import('./incidencias/incidencias').then((m) => m.Incidencias),
      },
      // 'nueva' va antes que ':id', si no Angular la tomaría por un id
      {
        path: 'incidencias/nueva',
        loadComponent: () => import('./incidencia-form/incidencia-form').then((m) => m.IncidenciaForm),
      },
      {
        path: 'incidencias/:id',
        loadComponent: () => import('./incidencia-detalle/incidencia-detalle').then((m) => m.IncidenciaDetalle),
      },
      {
        path: 'clientes',
        canActivate: [rolGuard('admin')],
        loadComponent: () => import('./clientes/clientes').then((m) => m.Clientes),
      },
      {
        path: 'tecnicos',
        canActivate: [rolGuard('admin')],
        loadComponent: () => import('./tecnicos/tecnicos').then((m) => m.Tecnicos),
      },
      {
        path: 'dispositivos',
        canActivate: [rolGuard('admin', 'tecnico')],
        loadComponent: () => import('./dispositivos/dispositivos').then((m) => m.Dispositivos),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];