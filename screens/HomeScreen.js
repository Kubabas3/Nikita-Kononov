import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [treningi, setTreningi] = useState([]);
  const [szukaj, setSzukaj] = useState('');

  const dodajTrening = (nowy) => {
    setTreningi((prev) => [nowy, ...prev]);
  };

  const usunTrening = (id) => {
    Alert.alert('Usuń trening', 'Czy na pewno chcesz usunąć ten trening?', [
      { text: 'Anuluj', style: 'cancel' },
      {
        text: 'Usuń',
        onPress: () => {
          setTreningi((prev) => prev.filter((t) => t.id !== id));
        },
        style: 'destructive',
      },
    ]);
  };

  const filtrujTreningi = () => {
    const tekst = szukaj.toLowerCase();
    return treningi.filter(
      (t) =>
        t.nazwa.toLowerCase().includes(tekst) ||
        t.kategoria.toLowerCase().includes(tekst)
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Szukaj po nazwie lub kategorii"
        value={szukaj}
        onChangeText={setSzukaj}
      />

      <FlatList
        data={filtrujTreningi()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{item.nazwa}</Text>
              <Text style={styles.subtitle}>{item.kategoria}</Text>
              {item.lokalizacja && (
                <Text style={styles.coords}>
                  📍 {item.lokalizacja.latitude.toFixed(3)}, {item.lokalizacja.longitude.toFixed(3)}
                </Text>
              )}
            </View>
            <TouchableOpacity onPress={() => usunTrening(item.id)}>
              <Ionicons name="trash-outline" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() =>
          navigation.navigate('AddWorkout', { onDodaj: dodajTrening })
        }
      >
        <Text style={styles.fabText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  item: {
    flexDirection: 'row',
    padding: 14,
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: { fontSize: 16, fontWeight: 'bold' },
  subtitle: { fontSize: 14, color: '#555' },
  coords: { fontSize: 12, color: '#888', marginTop: 4 },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#007bff',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabText: { fontSize: 30, color: 'white' },
});

