export interface DatosCliente {
  nombre: string;
  apellidos: string;
  email: string;
  empresa: string;
  telefono: string;
  direccion: string;
}

export interface Cliente extends DatosCliente {
  id: number;
}

// Datos de prueba: se sustituirán por llamadas a la API
export const CLIENTES_DATA: Cliente[] = [
  { id: 4, nombre: 'Pablo', apellidos: 'Hernández', email: 'pablo.hernandez@medtech.example', empresa: 'MedTech Salud', telefono: '922 555 014', direccion: 'Av. Anaga 12, Santa Cruz de Tenerife' },
  { id: 3, nombre: 'Elena', apellidos: 'Cabrera', email: 'elena.cabrera@atlantico.example', empresa: 'Grupo Atlántico', telefono: '922 555 013', direccion: 'C/ del Pilar 8, La Laguna' },
  { id: 2, nombre: 'Javier', apellidos: 'Soto', email: 'javier.soto@nexus.example', empresa: 'Nexus Corp', telefono: '932 555 012', direccion: 'Passeig de Gràcia 45, Barcelona' },
  { id: 1, nombre: 'Marta', apellidos: 'Ruiz', email: 'marta.ruiz@bancocentral.example', empresa: 'Banco Central', telefono: '912 555 011', direccion: 'Paseo de la Castellana 100, Madrid' },
];