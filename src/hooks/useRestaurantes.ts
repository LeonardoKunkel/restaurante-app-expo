import { useCallback, useEffect, useState } from 'react';
import { Restaurante } from '../models/restaurante';
import {
    actualizarRestaurante,
    eliminarRestaurante,
    guardarRestaurante,
    obtenerRestaurantes,
} from '../storage/restauranteStorage';

export function useRestaurantes() {
    const [restaurantes, setRestaurantes] = useState<Restaurante[]>([]);
    const [cargando, setCargando] = useState(true);

    const cargar = useCallback(async () => {
        setCargando(true);
        const datos = await obtenerRestaurantes();
        setRestaurantes(datos);
        setCargando(false);
    }, []);

    useEffect(() => {
        cargar();
    }, [cargar]);

    const agregar = useCallback(async (datos: Partial<Restaurante>) => {
        const nuevo = await guardarRestaurante(datos);
        setRestaurantes(prev => [...prev, nuevo]);
        return nuevo;
    }, []);

    const actualizar = useCallback(async (id: string, cambios: Partial<Restaurante>) => {
        const actualizado = await actualizarRestaurante(id, cambios);
        if (actualizado) {
            setRestaurantes(prev => prev.map(r => r.id === id ? actualizado : r));
        }
        return actualizado;
    }, []);

    const eliminar = useCallback(async (id: string) => {
        await eliminarRestaurante(id);
        setRestaurantes(prev => prev.filter(r => r.id !== id));
    }, []);

    return { restaurantes, cargando, agregar, actualizar, eliminar, recargar: cargar };
}