import { StyleSheet, Text, View } from 'react-native';

export default function ListaScreen() {
  return (
    <View style={styles.container}>
      <Text>Mis Restaurantes 🍽️</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' }
});