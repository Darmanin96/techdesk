import { Injectable, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, switchMap, tap, throwError, timer } from 'rxjs';

export type Rol = 'admin' | 'tecnico' | 'cliente';

export interface Usuario {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  rol: Rol;
}

const CLAVE_SESION = 'techdesk.sesion';

// Usuarios de prueba equivalentes a los del seed del backend (misma contraseña para todos).
// Se eliminan cuando login() llame a POST /api/auth/login.
const PASSWORD_MOCK = 'Techdesk123!';
const USUARIOS_MOCK: Usuario[] = [
  { id: 1, nombre: 'Admin', apellidos: 'TechDesk', email: 'admin@techdesk.example', rol: 'admin' },
  { id: 2, nombre: 'Daniel', apellidos: 'Darmanin', email: 'daniel.darmanin@techdesk.example', rol: 'tecnico' },
  { id: 5, nombre: 'Marta', apellidos: 'Ruiz', email: 'marta.ruiz@bancocentral.example', rol: 'cliente' },
];

@Injectable({ providedIn: 'root' })
export class Auth {
  private router = inject(Router);

  private _usuario = signal<Usuario | null>(this.leerSesion());
  readonly usuario = this._usuario.asReadonly();
  readonly autenticado = computed(() => this._usuario() !== null);

  login(email: string, password: string): Observable<Usuario> {
    return timer(300).pipe(
      switchMap(() => {
        const usuario = USUARIOS_MOCK.find((u) => u.email === email.trim().toLowerCase());
        return usuario && password === PASSWORD_MOCK
          ? of(usuario)
          : throwError(() => new Error('Credenciales incorrectas'));
      }),
      tap((usuario) => {
        this._usuario.set(usuario);
        sessionStorage.setItem(CLAVE_SESION, JSON.stringify(usuario));
      }),
    );
  }

  logout(): void {
    sessionStorage.removeItem(CLAVE_SESION);
    this._usuario.set(null);
    this.router.navigate(['/login']);
  }

  private leerSesion(): Usuario | null {
    try {
      const raw = sessionStorage.getItem(CLAVE_SESION);
      return raw ? (JSON.parse(raw) as Usuario) : null;
    } catch {
      return null;
    }
  }
}