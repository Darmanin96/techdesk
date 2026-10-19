import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Auth } from '../core/auth';

interface CuentaDemo {
  rol: string;
  email: string;
}

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatIconModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  ocultarPassword = signal(true);
  cargando = signal(false);
  error = signal('');

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  // Solo para desarrollo: se eliminan al conectar con el backend
  private readonly passwordDemo = 'Techdesk123!';
  readonly cuentasDemo: CuentaDemo[] = [
    { rol: 'Admin', email: 'admin@techdesk.example' },
    { rol: 'Técnico', email: 'daniel.darmanin@techdesk.example' },
    { rol: 'Cliente', email: 'marta.ruiz@bancocentral.example' },
  ];

  usarCuenta(cuenta: CuentaDemo): void {
    this.form.setValue({ email: cuenta.email, password: this.passwordDemo });
    this.error.set('');
  }

  invalido(campo: 'email' | 'password'): boolean {
    const control = this.form.controls[campo];
    return control.invalid && control.touched;
  }

  entrar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.error.set('');
    this.cargando.set(true);
    const { email, password } = this.form.getRawValue();

    this.auth.login(email, password).subscribe({
      next: (usuario) => {
        // Solo se aceptan rutas internas, para evitar redirecciones a otros sitios
        const redirect = this.route.snapshot.queryParamMap.get('redirect');
        const interna = redirect && redirect.startsWith('/') && !redirect.startsWith('//');
        this.router.navigateByUrl(interna ? redirect : usuario.rol === 'cliente' ? '/incidencias' : '/dashboard');
      },
      error: (e: Error) => {
        this.error.set(e.message);
        this.cargando.set(false);
      },
    });
  }
}