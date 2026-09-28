import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

type Prioridad = 'critica' | 'alta' | 'media' | 'baja';

interface Metrica {
  label: string;
  valor: string;
  icono: string;
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
  // Datos de prueba: se sustituirán por llamadas a la API
  metricas: Metrica[] = [
    { label: 'Incidencias activas', valor: '14', icono: 'confirmation_number' },
    { label: 'En progreso', valor: '8', icono: 'autorenew' },
    { label: 'Resueltas hoy', valor: '19', icono: 'check_circle' },
    { label: 'Tiempo medio', valor: '18 min', icono: 'timer' },
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
    const etiquetas: Record<Prioridad, string> = {
      critica: 'Crítica',
      alta: 'Alta',
      media: 'Media',
      baja: 'Baja',
    };
    return etiquetas[p];
  }
}