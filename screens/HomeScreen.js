import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  const [treningi, setTreningi] = useState([]);

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


  // Функция для добавления фиктивной тренировки
  const dodajTrening = async () => {
    const nowyTrening = {
      id: Date.now().toString(),
      nazwa: 'Trening siłowy',
      data: new Date().toLocaleDateString()
    };

    setTreningi(prev => [...prev, nowyTrening]);
        try {
      const nowe = [...treningi, nowyTrening];
      setTreningi(nowe);
      await AsyncStorage.setItem('treningi', JSON.stringify(nowe));
    } catch (e) {
      console.log('Błąd zapisu treningów:', e);
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Ekran główny</Text>

      <Button title="Dodaj trening" onPress={dodajTrening} />

      {/* Список всех добавленных тренировок */}
      <FlatList
        data={treningi}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text>{item.nazwa} - {item.data}</Text>
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
