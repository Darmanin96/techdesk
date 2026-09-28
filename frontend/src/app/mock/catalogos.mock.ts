// Datos de prueba: se sustituirán por llamadas a la API
export const CLIENTES: string[] = ['Banco Central', 'Nexus Corp', 'Grupo Atlántico', 'MedTech Salud'];

export const TECNICOS: string[] = ['Daniel', 'Carlos M.', 'Laura P.'];

export interface DispositivoResumen {
  cliente: string;
  nombre: string;
}

export const DISPOSITIVOS: DispositivoResumen[] = [
  { cliente: 'Banco Central', nombre: 'Servidor Dell R740' },
  { cliente: 'Banco Central', nombre: 'Switch Cisco Catalyst' },
  { cliente: 'Nexus Corp', nombre: 'HP LaserJet Pro' },
  { cliente: 'Nexus Corp', nombre: 'Router Cisco ISR' },
  { cliente: 'Grupo Atlántico', nombre: 'Lenovo ThinkPad T14' },
  { cliente: 'Grupo Atlántico', nombre: 'PC sobremesa HP' },
  { cliente: 'MedTech Salud', nombre: 'Synology DS920+' },
  { cliente: 'MedTech Salud', nombre: 'Servidor AD' },
];