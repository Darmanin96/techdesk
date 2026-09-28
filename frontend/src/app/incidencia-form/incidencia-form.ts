import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CLIENTES, DISPOSITIVOS, TECNICOS } from '../mock/catalogos.mock';
import { ETIQUETAS_PRIORIDAD, INCIDENCIAS, Prioridad } from '../mock/incidencias.mock';

@Component({
  selector: 'app-incidencia-form',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './incidencia-form.html',
  styleUrl: './incidencia-form.scss',
})
export class IncidenciaForm {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  readonly clientes = CLIENTES;
  readonly tecnicos = TECNICOS;
  readonly etiquetasPrioridad = ETIQUETAS_PRIORIDAD;
  readonly prioridades = Object.keys(ETIQUETAS_PRIORIDAD) as Prioridad[];

  form = this.fb.nonNullable.group({
    cliente: ['', Validators.required],
    dispositivo: [{ value: '', disabled: true }],
    asunto: ['', [Validators.required, Validators.minLength(5)]],
    descripcion: ['', [Validators.required, Validators.minLength(10)]],
    prioridad: ['media' as Prioridad, Validators.required],
    tecnico: [''],
  });

  private clienteSeleccionado = toSignal(this.form.controls.cliente.valueChanges, { initialValue: '' });

  dispositivosDelCliente = computed(() =>
    DISPOSITIVOS.filter((d) => d.cliente === this.clienteSeleccionado()),
  );

  constructor() {
    // El dispositivo depende del cliente: se reinicia y se habilita al elegir uno
    this.form.controls.cliente.valueChanges.subscribe((cliente) => {
      const dispositivo = this.form.controls.dispositivo;
      dispositivo.reset('');
      if (cliente) {
        dispositivo.enable();
      } else {
        dispositivo.disable();
      }
    });
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const v = this.form.getRawValue();
    const id = Math.max(...INCIDENCIAS.map((i) => i.id)) + 1;

    // Solo en memoria: cuando exista el backend será un POST /api/incidencias
    INCIDENCIAS.unshift({
      id,
      ticket: `#TK-${id}`,
      asunto: v.asunto.trim(),
      descripcion: v.descripcion.trim(),
      cliente: v.cliente,
      dispositivo: v.dispositivo || 'Sin dispositivo',
      prioridad: v.prioridad,
      estado: 'abierta',
      tecnico: v.tecnico || null,
      fecha: new Date().toISOString().slice(0, 10),
    });

    this.router.navigate(['/incidencias', id]);
  }
}