import { useCallback, useEffect, useState } from 'react';
import {
    actualizarRestaurante,
    eliminarRestaurante,
    guardarRestaurante,
    obtenerRestaurantes,
} from '../storage/restauranteStorage';

export function useRestaurantes() {
    const [restaurantes, setRestaurantes] = useState([]);
    const [cargando, setCargando] = useState(true);

    const cargar = useCallback(async () => {
        setCargando(true);
        const datos = await obtenerRestaurantes();
        setRestaurantes(datos);
        setCargando(false);
    }, []);

    useEffect(() => {
        cargar();
    }, []);

    const agregar = useCallback(async (datos) => {
        const nuevo = await guardarRestaurante(datos);
        setRestaurantes(prev => [...prev, nuevo]);
        return nuevo;
    }, []);

    const actualizar = useCallback(async (id, cambios) => {
        const actualizado = await actualizarRestaurante(id, cambios);
        setRestaurantes(prev => prev.map(r => r.id === id ? actualizado : r));
        return actualizado;
    }, []);

    const eliminar = useCallback(async (id) => {
        await eliminarRestaurante(id);
        setRestaurantes(prev => prev.filter(r => r.id !== id));
    }, []);

    return { restaurantes, cargando, agregar, actualizar, eliminar, recargar: cargar };
}