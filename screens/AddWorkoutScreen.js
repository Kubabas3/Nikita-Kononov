import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
} from 'react-native';
import * as Location from 'expo-location';

export default function AddWorkoutScreen({ navigation, route }) {
  const [nazwa, setNazwa] = useState('');
  const [kategoria, setKategoria] = useState('');

  const dodajTrening = async () => {
    if (!nazwa || !kategoria) {
      Alert.alert('Błąd', 'Uzupełnij wszystkie pola');
      return;
    }

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Brak zgody', 'Nie przyznano dostępu do lokalizacji.');
        return;
      }

      const lokalizacja = await Location.getCurrentPositionAsync({});
      const nowyTrening = {
        id: Date.now().toString(),
        nazwa,
        kategoria,
        data: new Date().toLocaleDateString('pl-PL'),
        lokalizacja: {
          latitude: lokalizacja.coords.latitude,
          longitude: lokalizacja.coords.longitude,
        },
      };

      route.params.onDodaj(nowyTrening);
      navigation.goBack();
    } catch (e) {
      Alert.alert('Błąd', 'Nie udało się pobrać lokalizacji.');
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nazwa treningu</Text>
      <TextInput
        style={styles.input}
        value={nazwa}
        onChangeText={setNazwa}
        placeholder="np. Bieganie"
      />
      <Text style={styles.label}>Kategoria</Text>
      <TextInput
        style={styles.input}
        value={kategoria}
        onChangeText={setKategoria}
        placeholder="np. Kardio"
      />
      <Button title="Dodaj" onPress={dodajTrening} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  label: { fontSize: 16, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
});
