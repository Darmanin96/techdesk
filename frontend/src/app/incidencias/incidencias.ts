import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {
  ETIQUETAS_ESTADO,
  ETIQUETAS_PRIORIDAD,
  Estado,
  INCIDENCIAS,
  Prioridad,
} from '../mock/incidencias.mock';

const MESES = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const SIN_ASIGNAR = '__sin_asignar__';

@Component({
  selector: 'app-incidencias',
  imports: [RouterLink, MatIconModule],
  templateUrl: './incidencias.html',
  styleUrl: './incidencias.scss',
})
export class Incidencias {
  readonly etiquetasPrioridad = ETIQUETAS_PRIORIDAD;
  readonly etiquetasEstado = ETIQUETAS_ESTADO;
  readonly prioridades = Object.keys(ETIQUETAS_PRIORIDAD) as Prioridad[];
  readonly estados = Object.keys(ETIQUETAS_ESTADO) as Estado[];
  readonly sinAsignar = SIN_ASIGNAR;

  // Técnicos que aparecen en las incidencias (para el filtro)
  readonly tecnicos = [
    ...new Set(INCIDENCIAS.map((i) => i.tecnico).filter((t): t is string => t !== null)),
  ];

  readonly total = INCIDENCIAS.length;
  readonly conteos = INCIDENCIAS.reduce<Record<string, number>>((acc, i) => {
    acc[i.estado] = (acc[i.estado] || 0) + 1;
    return acc;
  }, {});

  busqueda = signal('');
  filtroEstado = signal<Estado | ''>('');
  filtroPrioridad = signal<Prioridad | ''>('');
  filtroTecnico = signal('');

  filtradas = computed(() => {
    const q = this.busqueda().trim().toLowerCase();
    const estado = this.filtroEstado();
    const prioridad = this.filtroPrioridad();
    const tecnico = this.filtroTecnico();

    return INCIDENCIAS.filter((i) => {
      const coincideTexto =
        !q || [i.ticket, i.asunto, i.cliente, i.dispositivo].some((v) => v.toLowerCase().includes(q));
      const coincideTecnico =
        !tecnico || (tecnico === SIN_ASIGNAR ? i.tecnico === null : i.tecnico === tecnico);
      return (
        coincideTexto &&
        coincideTecnico &&
        (!estado || i.estado === estado) &&
        (!prioridad || i.prioridad === prioridad)
      );
    });
  });

  hayFiltros = computed(
    () =>
      !!(
        this.busqueda().trim() ||
        this.filtroEstado() ||
        this.filtroPrioridad() ||
        this.filtroTecnico()
      ),
  );

  alternarEstado(estado: Estado): void {
    this.filtroEstado.set(this.filtroEstado() === estado ? '' : estado);
  }

  limpiar(): void {
    this.busqueda.set('');
    this.filtroEstado.set('');
    this.filtroPrioridad.set('');
    this.filtroTecnico.set('');
  }

  inicial(nombre: string): string {
    return nombre.charAt(0).toUpperCase();
  }

  colorAvatar(nombre: string): string {
    let h = 0;
    for (const c of nombre) {
      h = (h * 31 + c.charCodeAt(0)) % 4;
    }
    return 'a' + h;
  }

  // '2026-09-28' -> '28 sep'
  fechaCorta(fecha: string): string {
    const [, mes, dia] = fecha.split('-');
    return `${Number(dia)} ${MESES[Number(mes) - 1]}`;
  }
}