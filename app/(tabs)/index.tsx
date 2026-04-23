import { useRestaurantes } from '@/src/hooks/useRestaurantes';
import { ESTADOS, Estado, Restaurante } from '@/src/models/restaurante';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    FlatList,
    Image,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput, TouchableOpacity,
    View
} from 'react-native';

const FILTROS = [
    { label: 'Todos', value: null },
    { label: 'Por ir', value: ESTADOS.POR_IR },
    { label: 'Visitados', value: ESTADOS.VISITADO },
    { label: 'Recomendados', value: ESTADOS.RECOMENDADO },
];

const BADGE_COLORS: Record<Estado, { bg: string; text: string }> = {
    por_ir: { bg: '#FAEEDA', text: '#633806' },
    visitado: { bg: '#EAF3DE', text: '#27500A' },
    recomendado: { bg: '#EEEDFE', text: '#3C3489' },
};

const BADGE_LABELS: Record<Estado, string> = {
    por_ir: 'Por ir',
    visitado: 'Visitado',
    recomendado: 'Recomendado',
};

function Estrellas({ calificacion }: { calificacion: number }) {
    return (
        <View style={styles.estrellas}>
            {[1, 2, 3, 4, 5].map(i => (
                <Text key={i} style={{ color: i <= calificacion ? '#EF9F27' : '#B4B2A9', fontSize: 14 }}>★</Text>
            ))}
        </View>
    );
}

function TarjetaRestaurante({ restaurante, onPress }: { restaurante: Restaurante; onPress: () => void }) {
    const badge = BADGE_COLORS[restaurante.estado];
    return (
        <Pressable style={styles.card} onPress={onPress}>
            <View style={styles.cardImg}>
                {restaurante.fotos.length > 0
                    ? <Image source={{ uri: restaurante.fotos[0] }} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
                    : <Text style={styles.cardImgPlaceholder}>🍽️</Text>
                }
                <View style={[styles.badge, { backgroundColor: badge.bg }]}>
                    <Text style={[styles.badgeText, { color: badge.text }]}>
                        {BADGE_LABELS[restaurante.estado]}
                    </Text>
                </View>
            </View>
            <View style={styles.cardBody}>
                <View style={styles.cardRow}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.cardNombre} numberOfLines={1}>{restaurante.nombre}</Text>
                        <Text style={styles.cardCat} numberOfLines={1}>
                            {restaurante.categoria}{restaurante.direccion ? ` · ${restaurante.direccion}` : ''}
                        </Text>
                    </View>
                    <Estrellas calificacion={restaurante.calificacion} />
                </View>
            </View>
        </Pressable>
    );
}

export default function ListaScreen() {
    const { restaurantes, cargando } = useRestaurantes();
    const [busqueda, setBusqueda] = useState('');
    const [filtroEstado, setFiltroEstado] = useState<Estado | null>(null);
    const router = useRouter();

    const filtrados = restaurantes.filter(r => {
        const coincideBusqueda =
            r.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            r.categoria.toLowerCase().includes(busqueda.toLowerCase());
        const coincideEstado = filtroEstado ? r.estado === filtroEstado : true;
        return coincideBusqueda && coincideEstado;
    });

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titulo}>Mis restaurantes</Text>
                <TouchableOpacity style={styles.addBtn} onPress={() => router.push(`/restaurante/nuevo`)}>
                    <Text style={styles.addBtnText}>+</Text>
                </TouchableOpacity>
            </View>

            <TextInput
                style={styles.search}
                placeholder="Buscar restaurante..."
                placeholderTextColor="#888"
                value={busqueda}
                onChangeText={setBusqueda}
            />

            <View style={styles.filtros}>
                {FILTROS.map(f => (
                    <Pressable
                        key={f.label}
                        style={[styles.filtro, filtroEstado === f.value && styles.filtroActivo]}
                        onPress={() => setFiltroEstado(f.value)}
                    >
                        <Text style={[styles.filtroText, filtroEstado === f.value && styles.filtroTextoActivo]}>
                            {f.label}
                        </Text>
                    </Pressable>
                ))}
            </View>

            <FlatList
                data={filtrados}
                keyExtractor={r => r.id}
                renderItem={({ item }) => (
                    <TarjetaRestaurante
                        restaurante={item}
                        onPress={() => router.push(`/restaurante/${item.id}`)}
                    />
                )}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyText}>
                            {cargando ? 'Cargando...' : 'No hay restaurantes aún.\n¡Agrega el primero!'}
                        </Text>
                    </View>
                }
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, marginBottom: 12 },
    titulo: { fontSize: 26, fontWeight: '600' },
    addBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#EEEDFE', alignItems: 'center', justifyContent: 'center' },
    addBtnText: { fontSize: 22, color: '#534AB7', lineHeight: 26 },
    search: { backgroundColor: '#F1EFE8', borderRadius: 10, padding: 10, fontSize: 14, marginBottom: 12 },
    filtros: { flexDirection: 'row', gap: 8, marginBottom: 14 },
    filtro: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20, backgroundColor: '#F1EFE8' },
    filtroActivo: { backgroundColor: '#EEEDFE' },
    filtroText: { fontSize: 13, color: '#5F5E5A' },
    filtroTextoActivo: { color: '#3C3489', fontWeight: '500' },
    card: { borderRadius: 14, borderWidth: 0.5, borderColor: '#D3D1C7', marginBottom: 12, overflow: 'hidden', backgroundColor: '#fff' },
    cardImg: { height: 120, backgroundColor: '#F1EFE8', alignItems: 'center', justifyContent: 'center' },
    cardImgPlaceholder: { fontSize: 32 },
    badge: { position: 'absolute', top: 8, right: 8, paddingHorizontal: 10, paddingVertical: 3, borderRadius: 20 },
    badgeText: { fontSize: 11, fontWeight: '500' },
    cardBody: { padding: 12 },
    cardRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
    cardNombre: { fontSize: 15, fontWeight: '600', marginBottom: 2 },
    cardCat: { fontSize: 12, color: '#888780' },
    estrellas: { flexDirection: 'row', gap: 1 },
    empty: { flex: 1, alignItems: 'center', paddingTop: 60 },
    emptyText: { color: '#888', textAlign: 'center', lineHeight: 22 },
});