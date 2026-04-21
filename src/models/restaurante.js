
import 'react-native-get-random-values';

// Estados posibles de un restaurante
export const ESTADOS = {
    POR_IR: 'por_ir',
    VISITADO: 'visitado',
    RECOMENDADO: 'recomendado',
};

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
];

export function crearRestaurante(datos = []) {
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
