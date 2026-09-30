export interface DatosTecnico {
  nombre: string;
  apellidos: string;
  email: string;
  especialidad: string;
  telefono: string;
}

export interface Tecnico extends DatosTecnico {
  id: number;
}

// Datos de prueba: se sustituirán por llamadas a la API
export const TECNICOS_DATA: Tecnico[] = [
  { id: 3, nombre: 'Laura', apellidos: 'Pérez', email: 'laura.perez@techdesk.example', especialidad: 'Puestos de trabajo', telefono: '600 555 103' },
  { id: 2, nombre: 'Carlos', apellidos: 'Martín', email: 'carlos.martin@techdesk.example', especialidad: 'Redes', telefono: '600 555 102' },
  { id: 1, nombre: 'Daniel', apellidos: 'Darmanin', email: 'daniel.darmanin@techdesk.example', especialidad: 'Servidores y bases de datos', telefono: '600 555 101' },
];