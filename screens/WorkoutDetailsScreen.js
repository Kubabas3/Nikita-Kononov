import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function WorkoutDetailsScreen({ route, navigation }) {
  const { trening } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{trening.nazwa}</Text>
      <Text style={styles.label}>Kategoria: {trening.kategoria}</Text>
      <Text style={styles.label}>Data: {trening.data}</Text>
      {trening.lokalizacja && (
        <Text style={styles.label}>
          Lokalizacja: {trening.lokalizacja.latitude.toFixed(3)}, {trening.lokalizacja.longitude.toFixed(3)}
        </Text>
      )}
      <Button title="Powrót" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, marginBottom: 10 },
});
