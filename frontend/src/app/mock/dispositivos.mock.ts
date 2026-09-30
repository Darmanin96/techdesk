export interface DatosDispositivo {
  cliente: string;
  tipo: string;
  marca: string;
  modelo: string;
  numeroSerie: string;
}

export interface Dispositivo extends DatosDispositivo {
  id: number;
}

export const TIPOS_DISPOSITIVO: string[] = [
  'Portátil',
  'PC sobremesa',
  'Servidor',
  'Impresora',
  'Router',
  'Switch',
  'NAS',
  'Otro',
];

// Datos de prueba: se sustituirán por llamadas a la API
export const DISPOSITIVOS_DATA: Dispositivo[] = [
  { id: 8, cliente: 'MedTech Salud', tipo: 'Servidor', marca: 'Genérico', modelo: 'Servidor AD', numeroSerie: 'SRV-AD-08' },
  { id: 7, cliente: 'MedTech Salud', tipo: 'NAS', marca: 'Synology', modelo: 'DS920+', numeroSerie: 'SYN-DS920-07' },
  { id: 6, cliente: 'Grupo Atlántico', tipo: 'PC sobremesa', marca: 'HP', modelo: 'ProDesk 400', numeroSerie: 'HP-PD400-06' },
  { id: 5, cliente: 'Grupo Atlántico', tipo: 'Portátil', marca: 'Lenovo', modelo: 'ThinkPad T14', numeroSerie: 'LEN-T14-05' },
  { id: 4, cliente: 'Nexus Corp', tipo: 'Router', marca: 'Cisco', modelo: 'ISR 1100', numeroSerie: 'CIS-ISR1100-04' },
  { id: 3, cliente: 'Nexus Corp', tipo: 'Impresora', marca: 'HP', modelo: 'LaserJet Pro', numeroSerie: 'HP-LJP-03' },
  { id: 2, cliente: 'Banco Central', tipo: 'Switch', marca: 'Cisco', modelo: 'Catalyst 2960', numeroSerie: 'CIS-CAT2960-02' },
  { id: 1, cliente: 'Banco Central', tipo: 'Servidor', marca: 'Dell', modelo: 'R740', numeroSerie: 'DELL-R740-01' },
];