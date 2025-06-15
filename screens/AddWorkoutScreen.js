// screens/AddWorkoutScreen.js
import React, { useState, useContext } from 'react';
import {
  View, Text, TextInput, Button, Image,
  StyleSheet, Alert, ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { WorkoutContext } from '../context/WorkoutContext';

export default function AddWorkoutScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [photoUri, setPhotoUri] = useState(null);
  const [location, setLocation] = useState(null);
  const { addWorkout } = useContext(WorkoutContext);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Błąd', 'Brak dostępu do kamery.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Błąd', 'Dostęp do lokalizacji zabroniony.');
      return;
    }
    const loc = await Location.getCurrentPositionAsync();
    setLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
  };

  const saveHandler = async () => {
    try {
      await addWorkout(title, photoUri, location);
      navigation.navigate('Home');
    } catch (e) {
      Alert.alert('Błąd', e.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Nazwa treningu</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Wprowadź nazwę treningu"
      />

      <Button title="Zrób zdjęcie" onPress={takePhoto} color="#6f3dff" />
      {photoUri && <Image source={{ uri: photoUri }} style={styles.image} />}

      <View style={{ height: 16 }} />
      <Button title="Pokaż lokalizację" onPress={getLocation} color="#6f3dff" />
      {location && (
        <Text style={styles.location}>
          {location.latitude}, {location.longitude}
        </Text>
      )}

      <View style={{ height: 24 }} />
      <Button title="Zapisz" onPress={saveHandler} color="#6f3dff" />

      <View style={{ marginTop: 12 }}>
        <Button title="Powrót" onPress={() => navigation.navigate('Home')} color="#6f3dff" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff' },
  label: { fontSize: 16, marginBottom: 8, color: '#333',  },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, marginBottom: 16, padding: 8 },
  image: { width: '100%', aspectRatio: 16 / 9, marginVertical: 16, borderRadius: 8 },
  //button: { backgroundColor: '#6f3dff',},
  location: { fontSize: 16, marginTop: 8, marginBottom: 16, color: '#333' },
});
