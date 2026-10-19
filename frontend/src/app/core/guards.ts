import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, Rol } from './auth';

// Sin sesión -> /login, recordando a dónde quería ir
export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);
  return auth.autenticado()
    ? true
    : router.createUrlTree(['/login'], { queryParams: { redirect: state.url } });
};

// Con sesión pero sin el rol necesario -> /incidencias (la única pantalla de todos los roles)
export const rolGuard =
  (...roles: Rol[]): CanActivateFn =>
  () => {
    const rol = inject(Auth).usuario()?.rol;
    return rol && roles.includes(rol) ? true : inject(Router).createUrlTree(['/incidencias']);
  };