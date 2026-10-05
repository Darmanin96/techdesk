import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

type Prioridad = 'critica' | 'alta' | 'media' | 'baja';
type Tendencia = 'subida' | 'bajada' | 'neutra';

interface Metrica {
  label: string;
  valor: string;
  icono: string;
  color: 'blue' | 'amber' | 'green' | 'coral';
  tendencia: Tendencia;
  textoTendencia: string;
  detalle: string;
}

interface WeeklyPoint {
  label: string;
  value: number;
}

interface IncidenciaResumen {
  ticket: string;
  asunto: string;
  cliente: string;
  prioridad: Prioridad;
  tecnico: string | null;
}

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatTableModule, MatIconModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  metricas: Metrica[] = [
    {
      label: 'Incidencias activas',
      valor: '14',
      icono: 'confirmation_number',
      color: 'blue',
      tendencia: 'subida',
      textoTendencia: '+2 desde ayer',
      detalle: '26 tickets abiertos',
    },
    {
      label: 'En progreso',
      valor: '8',
      icono: 'autorenew',
      color: 'amber',
      tendencia: 'neutra',
      textoTendencia: 'Sin cambios',
      detalle: '3 pendientes hoy',
    },
    {
      label: 'Resueltas hoy',
      valor: '19',
      icono: 'check_circle',
      color: 'green',
      tendencia: 'subida',
      textoTendencia: '98% SLA',
      detalle: '5 en última hora',
    },
    {
      label: 'Tiempo medio',
      valor: '18 min',
      icono: 'timer',
      color: 'coral',
      tendencia: 'bajada',
      textoTendencia: '-3 min',
      detalle: 'Mejor que ayer',
    },
  ];

  weeklyData: WeeklyPoint[] = [
    { label: 'Lun', value: 40 },
    { label: 'Mar', value: 52 },
    { label: 'Mié', value: 70 },
    { label: 'Jue', value: 58 },
    { label: 'Vie', value: 86 },
    { label: 'Sáb', value: 48 },
    { label: 'Dom', value: 65 },
  ];

  columnas = ['ticket', 'asunto', 'cliente', 'prioridad', 'tecnico'];

  incidencias: IncidenciaResumen[] = [
    {
      ticket: '#TK-2041',
      asunto: 'Fallo en servidor principal de bases de datos',
      cliente: 'Banco Central',
      prioridad: 'critica',
      tecnico: 'Daniel',
    },
    {
      ticket: '#TK-2039',
      asunto: 'Caída de red VPN oficinas Barcelona',
      cliente: 'Nexus Corp',
      prioridad: 'alta',
      tecnico: 'Carlos M.',
    },
    {
      ticket: '#TK-2035',
      asunto: 'Error de autenticación SSO Office 365',
      cliente: 'MedTech Salud',
      prioridad: 'media',
      tecnico: null,
    },
  ];

  etiquetaPrioridad(p: Prioridad): string {
    const etiquetas: Record<string, string> = {
      critica: 'Crítica',
      alta: 'Alta',
      media: 'Media',
      baja: 'Baja',
    };
    return etiquetas[p];
  }

  iconoTendencia(t: Tendencia): string {
    return t === 'subida' ? 'trending_up' : t === 'bajada' ? 'trending_down' : 'remove';
  }
}