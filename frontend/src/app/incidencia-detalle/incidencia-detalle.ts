import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  CambioHistorial,
  Comentario,
  COMENTARIOS,
  ETIQUETAS_ESTADO,
  ETIQUETAS_PRIORIDAD,
  Estado,
  HISTORIAL,
  INCIDENCIAS,
  Prioridad,
} from '../mock/incidencias.mock';

@Component({
  selector: 'app-incidencia-detalle',
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './incidencia-detalle.html',
  styleUrl: './incidencia-detalle.scss',
})
export class IncidenciaDetalle {
  private route = inject(ActivatedRoute);

  readonly etiquetasPrioridad = ETIQUETAS_PRIORIDAD;
  readonly etiquetasEstado = ETIQUETAS_ESTADO;
  readonly prioridades = Object.keys(ETIQUETAS_PRIORIDAD) as Prioridad[];
  readonly estados = Object.keys(ETIQUETAS_ESTADO) as Estado[];

  // Usuario actual de prueba: vendrá del login
  private readonly usuarioActual = 'Daniel';

  private readonly id = Number(this.route.snapshot.paramMap.get('id'));
  readonly incidencia = INCIDENCIAS.find((i) => i.id === this.id);

  estado = signal<Estado>(this.incidencia?.estado ?? 'abierta');
  prioridad = signal<Prioridad>(this.incidencia?.prioridad ?? 'media');
  comentarios = signal<Comentario[]>([...(COMENTARIOS[this.id] ?? [])]);
  historial = signal<CambioHistorial[]>([...(HISTORIAL[this.id] ?? [])]);
  nuevoComentario = signal('');

  cambiarEstado(nuevo: Estado): void {
    const anterior = this.estado();
    if (nuevo === anterior) return;
    this.estado.set(nuevo);
    this.registrarCambio('Estado', ETIQUETAS_ESTADO[anterior], ETIQUETAS_ESTADO[nuevo]);
  }

  cambiarPrioridad(nueva: Prioridad): void {
    const anterior = this.prioridad();
    if (nueva === anterior) return;
    this.prioridad.set(nueva);
    this.registrarCambio('Prioridad', ETIQUETAS_PRIORIDAD[anterior], ETIQUETAS_PRIORIDAD[nueva]);
  }

  anadirComentario(): void {
    const texto = this.nuevoComentario().trim();
    if (!texto) return;
    this.comentarios.update((lista) => [
      ...lista,
      { autor: this.usuarioActual, texto, fecha: this.ahora() },
    ]);
    this.nuevoComentario.set('');
  }

  private registrarCambio(campo: string, anterior: string, nuevo: string): void {
    this.historial.update((lista) => [
      { campo, anterior, nuevo, autor: this.usuarioActual, fecha: this.ahora() },
      ...lista,
    ]);
  }

  private ahora(): string {
    return new Date().toISOString().slice(0, 16).replace('T', ' ');
  }
}