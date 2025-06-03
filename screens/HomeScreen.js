import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [treningi, setTreningi] = useState([]);

  // Загрузка сохранённых тренировок при запуске
  useEffect(() => {
    const wczytajTreningi = async () => {
      try {
        const dane = await AsyncStorage.getItem('treningi');
        if (dane !== null) {
          setTreningi(JSON.parse(dane));
        }
      } catch (e) {
        console.log('Błąd podczas ładowania treningów:', e);
      }
    };

    wczytajTreningi();
  }, []);

  // Добавление новой тренировки
  const dodajTrening = async () => {
    const nowyTrening = {
      id: Date.now().toString(),
      nazwa: 'Trening siłowy',
      data: new Date().toLocaleDateString()
    };

    try {
      const nowe = [...treningi, nowyTrening];
      setTreningi(nowe);
      await AsyncStorage.setItem('treningi', JSON.stringify(nowe));
    } catch (e) {
      console.log('Błąd zapisu treningów:', e);
    }
  };

  // Удаление тренировки по id
  const usunTrening = async (id) => {
    const nowe = treningi.filter(trening => trening.id !== id);
    setTreningi(nowe);
    try {
      await AsyncStorage.setItem('treningi', JSON.stringify(nowe));
    } catch (e) {
      console.log('Błąd podczas usuwania treningu:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Ekran główny</Text>

      <Button title="Dodaj trening" onPress={dodajTrening} />

      <FlatList
        data={treningi}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text onPress={() => usunTrening(item.id)}>
              {item.nazwa} - {item.data} (kliknij, aby usunąć)
            </Text>
          </View>
        )}
        style={{ marginTop: 20, width: '100%' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', paddingTop: 60, paddingHorizontal: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  item: { backgroundColor: '#eee', padding: 10, marginBottom: 10, borderRadius: 5 }
});
