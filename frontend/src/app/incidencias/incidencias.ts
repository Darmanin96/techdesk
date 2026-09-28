import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import {
  ETIQUETAS_ESTADO,
  ETIQUETAS_PRIORIDAD,
  Estado,
  INCIDENCIAS,
  Prioridad,
} from '../mock/incidencias.mock';

@Component({
  selector: 'app-incidencias',
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './incidencias.html',
  styleUrl: './incidencias.scss',
})
export class Incidencias {
  readonly etiquetasPrioridad = ETIQUETAS_PRIORIDAD;
  readonly etiquetasEstado = ETIQUETAS_ESTADO;

  readonly prioridades = Object.keys(ETIQUETAS_PRIORIDAD) as Prioridad[];
  readonly estados = Object.keys(ETIQUETAS_ESTADO) as Estado[];
  readonly columnas = ['ticket', 'asunto', 'cliente', 'dispositivo', 'prioridad', 'estado', 'tecnico', 'fecha'];

  busqueda = signal('');
  filtroEstado = signal<Estado | ''>('');
  filtroPrioridad = signal<Prioridad | ''>('');

  filtradas = computed(() => {
    const q = this.busqueda().trim().toLowerCase();
    const estado = this.filtroEstado();
    const prioridad = this.filtroPrioridad();

    return INCIDENCIAS.filter((i) => {
      const coincideTexto =
        !q || [i.ticket, i.asunto, i.cliente, i.dispositivo].some((v) => v.toLowerCase().includes(q));
      return coincideTexto && (!estado || i.estado === estado) && (!prioridad || i.prioridad === prioridad);
    });
  });
}