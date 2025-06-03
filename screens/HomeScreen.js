import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({ navigation }) {
  const [treningi, setTreningi] = useState([]);
  const [szukaj, setSzukaj] = useState(''); // Pole wyszukiwania

  useEffect(() => {
    const wczytajTreningi = async () => {
      try {
        const dane = await AsyncStorage.getItem('treningi');
        if (dane !== null) {
          setTreningi(JSON.parse(dane));
        }
      } catch (e) {
        console.log('Błąd ładowania danych:', e);
      }
    };
    wczytajTreningi();
  }, []);

  const usunTrening = async (id) => {
    const nowe = treningi.filter(t => t.id !== id);
    setTreningi(nowe);
    await AsyncStorage.setItem('treningi', JSON.stringify(nowe));
  };

  const potwierdzUsuniecie = (id) => {
    Alert.alert('Usuń trening', 'Czy na pewno chcesz usunąć ten trening?', [
      { text: 'Anuluj', style: 'cancel' },
      { text: 'Usuń', style: 'destructive', onPress: () => usunTrening(id) }
    ]);
  };

  // Filtrowanie na podstawie nazwy lub kategorii
  const przefiltrowane = treningi.filter(t =>
    t.nazwa.toLowerCase().includes(szukaj.toLowerCase()) ||
    t.kategoria.toLowerCase().includes(szukaj.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📋 Twoje treningi</Text>

      <TextInput
        style={styles.search}
        placeholder="Szukaj treningu lub kategorii"
        value={szukaj}
        onChangeText={setSzukaj}
      />

      <FlatList
        data={przefiltrowane}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onLongPress={() => potwierdzUsuniecie(item.id)}
            style={styles.item}
          >
            <Text style={styles.itemTitle}>{item.nazwa}</Text>
            <Text style={styles.itemCategory}>Kategoria: {item.kategoria}</Text>
            <Text style={styles.itemDate}>Data: {item.data}</Text>
          </TouchableOpacity>
        )}
      />

      <Button
        title="Dodaj trening"
        onPress={() =>
          navigation.navigate('AddWorkout', {
            onDodaj: async (nowy) => {
              const nowe = [...treningi, nowy];
              setTreningi(nowe);
              await AsyncStorage.setItem('treningi', JSON.stringify(nowe));
            }
          })
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  search: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8
  },
  item: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10
  },
  itemTitle: { fontSize: 18, fontWeight: 'bold' },
  itemCategory: { fontStyle: 'italic', color: '#555' },
  itemDate: { color: '#888' }
});
