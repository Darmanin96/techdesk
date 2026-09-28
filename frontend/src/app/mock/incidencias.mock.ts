export type Prioridad = 'critica' | 'alta' | 'media' | 'baja';
export type Estado = 'abierta' | 'en_proceso' | 'pendiente_cliente' | 'resuelta' | 'cerrada';

export interface Incidencia {
  id: number;
  ticket: string;
  asunto: string;
  descripcion: string;
  cliente: string;
  dispositivo: string;
  prioridad: Prioridad;
  estado: Estado;
  tecnico: string | null;
  fecha: string;
}

export interface Comentario {
  autor: string;
  texto: string;
  fecha: string;
}

export interface CambioHistorial {
  campo: string;
  anterior: string;
  nuevo: string;
  autor: string;
  fecha: string;
}

export const ETIQUETAS_PRIORIDAD: Record<string, string> = {
  critica: 'Crítica',
  alta: 'Alta',
  media: 'Media',
  baja: 'Baja',
};

export const ETIQUETAS_ESTADO: Record<string, string> = {
  abierta: 'Abierta',
  en_proceso: 'En proceso',
  pendiente_cliente: 'Pendiente cliente',
  resuelta: 'Resuelta',
  cerrada: 'Cerrada',
};

// Datos de prueba: se sustituirán por llamadas a la API
export const INCIDENCIAS: Incidencia[] = [
  { id: 2041, ticket: '#TK-2041', asunto: 'Fallo en servidor principal de bases de datos', descripcion: 'El servidor de producción no responde desde las 08:30. Las aplicaciones de oficina no pueden consultar la base de datos.', cliente: 'Banco Central', dispositivo: 'Servidor Dell R740', prioridad: 'critica', estado: 'en_proceso', tecnico: 'Daniel', fecha: '2026-09-28' },
  { id: 2040, ticket: '#TK-2040', asunto: 'Impresora de planta 2 no imprime', descripcion: 'La impresora muestra el error de atasco de papel aunque no hay ninguna hoja atascada.', cliente: 'Nexus Corp', dispositivo: 'HP LaserJet Pro', prioridad: 'baja', estado: 'abierta', tecnico: null, fecha: '2026-09-28' },
  { id: 2039, ticket: '#TK-2039', asunto: 'Caída de red VPN oficinas Barcelona', descripcion: 'Los empleados de Barcelona no pueden conectarse a la VPN corporativa desde ayer por la tarde.', cliente: 'Nexus Corp', dispositivo: 'Router Cisco ISR', prioridad: 'alta', estado: 'en_proceso', tecnico: 'Carlos M.', fecha: '2026-09-27' },
  { id: 2038, ticket: '#TK-2038', asunto: 'Portátil no arranca tras actualización', descripcion: 'Tras instalar las últimas actualizaciones el equipo se queda en pantalla negra al iniciar.', cliente: 'Grupo Atlántico', dispositivo: 'Lenovo ThinkPad T14', prioridad: 'media', estado: 'pendiente_cliente', tecnico: 'Laura P.', fecha: '2026-09-27' },
  { id: 2037, ticket: '#TK-2037', asunto: 'Sustitución de disco en NAS', descripcion: 'El NAS avisa de un disco degradado. Se solicita sustitución preventiva.', cliente: 'MedTech Salud', dispositivo: 'Synology DS920+', prioridad: 'media', estado: 'resuelta', tecnico: 'Daniel', fecha: '2026-09-26' },
  { id: 2036, ticket: '#TK-2036', asunto: 'Configurar cuenta de correo nueva', descripcion: 'Alta de un nuevo empleado: crear cuenta de correo y configurarla en su equipo.', cliente: 'Grupo Atlántico', dispositivo: 'PC sobremesa HP', prioridad: 'baja', estado: 'cerrada', tecnico: 'Laura P.', fecha: '2026-09-25' },
  { id: 2035, ticket: '#TK-2035', asunto: 'Error de autenticación SSO Office 365', descripcion: 'Varios usuarios reciben un error al iniciar sesión en Office 365 con su cuenta corporativa.', cliente: 'MedTech Salud', dispositivo: 'Servidor AD', prioridad: 'media', estado: 'abierta', tecnico: null, fecha: '2026-09-25' },
];

export const COMENTARIOS: Record<number, Comentario[]> = {
  2041: [
    { autor: 'Daniel', texto: 'Reviso logs del servidor. El servicio de base de datos se detuvo por falta de espacio en disco.', fecha: '2026-09-28 09:10' },
    { autor: 'Banco Central', texto: '¿Hay estimación de cuándo estará operativo?', fecha: '2026-09-28 09:25' },
  ],
  2039: [
    { autor: 'Carlos M.', texto: 'Reiniciado el túnel en el router. Pendiente de verificar con un usuario de Barcelona.', fecha: '2026-09-27 17:40' },
  ],
};

export const HISTORIAL: Record<number, CambioHistorial[]> = {
  2041: [
    { campo: 'Estado', anterior: 'Abierta', nuevo: 'En proceso', autor: 'Daniel', fecha: '2026-09-28 09:05' },
    { campo: 'Prioridad', anterior: 'Alta', nuevo: 'Crítica', autor: 'Daniel', fecha: '2026-09-28 08:50' },
  ],
  2039: [
    { campo: 'Estado', anterior: 'Abierta', nuevo: 'En proceso', autor: 'Carlos M.', fecha: '2026-09-27 17:30' },
  ],
};