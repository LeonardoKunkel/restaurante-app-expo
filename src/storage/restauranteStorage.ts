import AsyncStorage from '@react-native-async-storage/async-storage';
import { crearRestaurante } from '../models/restaurante';

const STORAGE_KEY = '@restaurantes';

// Obtener todos los restaurantes
export async function obtenerRestaurantes() {
    try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        return json ? JSON.parse(json) : [];
    } catch (error) {
        console.error('Error al obtener restaurantes:', error);
        return [];
    }
}

// Guardar un restaurante nuevo
export async function guardarRestaurante(datos) {
    try {
        const restaurantes = await obtenerRestaurantes();
        const nuevo = crearRestaurante(datos);
        const actualizados = [...restaurantes, nuevo];
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(actualizados));
        return nuevo;
    } catch (error) {
        console.error('Error al guardar restaurante:', error);
        throw error;
    }
}

// Actualizar un restaurante existente
export async function actualizarRestaurante(id, cambios) {
    try {
        const restaurantes = await obtenerRestaurantes();
        const actualizados = restaurantes.map(r =>
            r.id === id
                ? { ...r, ...cambios, fechaActualizacion: new Date().toISOString() }
                : r
        );
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(actualizados));
        return actualizados.find(r => r.id === id);
    } catch (error) {
        console.error('Error al actualizar restaurante:', error);
        throw error;
    }
}

// Eliminar un restaurante
export async function eliminarRestaurante(id) {
    try {
        const restaurantes = await obtenerRestaurantes();
        const actualizados = restaurantes.filter(r => r.id !== id);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(actualizados));
    } catch (error) {
        console.error('Error al eliminar restaurante:', error);
        throw error;
    }
}

// Obtener un restaurante por ID
export async function obtenerRestaurantePorId(id) {
    try {
        const restaurantes = await obtenerRestaurantes();
        return restaurantes.find(r => r.id === id) || null;
    } catch (error) {
        console.error('Error al obtener restaurante:', error);
        return null;
    }
}