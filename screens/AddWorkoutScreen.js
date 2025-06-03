import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function AddWorkoutScreen({ navigation, route }) {
  const [nazwa, setNazwa] = useState('');
  const [kategoria, setKategoria] = useState('Siłownia');

  const zapiszTrening = () => {
    if (nazwa.trim() === '') {
      Alert.alert('Błąd', 'Podaj nazwę treningu!');
      return;
    }

    const nowyTrening = {
      id: Date.now().toString(),
      nazwa,
      kategoria,
      data: new Date().toLocaleDateString()
    };

    if (route.params?.onDodaj) {
      route.params.onDodaj(nowyTrening);
    }

    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>➕ Dodaj trening</Text>

      <TextInput
        placeholder="Nazwa treningu"
        value={nazwa}
        onChangeText={setNazwa}
        style={styles.input}
      />

      <Text style={styles.label}>Kategoria:</Text>
      <Picker
        selectedValue={kategoria}
        onValueChange={(itemValue) => setKategoria(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Siłownia" value="Siłownia" />
        <Picker.Item label="Cardio" value="Cardio" />
        <Picker.Item label="Stretching" value="Stretching" />
      </Picker>

      <Button title="Zapisz" onPress={zapiszTrening} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1, borderColor: '#ccc', padding: 10,
    marginBottom: 20, borderRadius: 5
  },
  label: { marginTop: 10, fontWeight: 'bold' },
  picker: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc'
  }
});
