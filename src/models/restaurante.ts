import { v4 as uuidv4 } from 'uuid';

// Estados posibles de un restaurante
export const ESTADOS = {
    POR_IR: 'por_ir',
    VISITADO: 'visitado',
    RECOMENDADO: 'recomendado',
} as const;

export type Estado = typeof ESTADOS[keyof typeof ESTADOS];

// Categorías de cocina
export const CATEGORIAS = [
    'Mexicana',
    'Italiana',
    'Japonesa',
    'China',
    'Americana',
    'Mediterránea',
    'India',
    'Francesa',
    'Mariscos',
    'Vegetariana',
    'Otra',
] as const;

export type Categoria = typeof CATEGORIAS[number];

export interface Ubicacion {
    latitude: number;
    longitude: number;
}

export interface Restaurante {
    id: string;
    nombre: string;
    direccion: string;
    categoria: Categoria | '';
    calificacion: number;
    notas: string;
    fotos: string[];
    estado: Estado;
    ubicacion: Ubicacion | null;
    fechaCreacion: string;
    fechaActualizacion: string;
}

export function crearRestaurante(datos: Partial<Restaurante> = {}): Restaurante {
    return {
        id: uuidv4(),
        nombre: '',
        direccion: '',
        categoria: '',
        calificacion: 0,        // 0 = sin calificar, 1-5 estrellas
        notas: '',
        fotos: [],              // array de URIs locales
        estado: ESTADOS.POR_IR,
        ubicacion: null,        // { latitude, longitude } o null
        fechaCreacion: new Date().toISOString(),
        fechaActualizacion: new Date().toISOString(),
        ...datos,
    }
}
