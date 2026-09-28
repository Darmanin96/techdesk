import { Routes } from '@angular/router';
import { Shell } from './shell/shell';

export const routes: Routes = [
  {
    path: '',
    component: Shell,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard) },
      { path: 'incidencias/:id', loadComponent: () => import('./incidencia-detalle/incidencia-detalle').then(m => m.IncidenciaDetalle) },
      { path: 'incidencias/nueva', loadComponent: () => import('./incidencia-form/incidencia-form').then(m => m.IncidenciaForm) },
      { path: 'incidencias', loadComponent: () => import('./incidencias/incidencias').then(m => m.Incidencias) },
      { path: 'clientes', loadComponent: () => import('./clientes/clientes').then(m => m.Clientes) },
      { path: 'tecnicos', loadComponent: () => import('./tecnicos/tecnicos').then(m => m.Tecnicos) },
      { path: 'dispositivos', loadComponent: () => import('./dispositivos/dispositivos').then(m => m.Dispositivos) },
    ],
  },
];