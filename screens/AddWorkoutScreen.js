import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { useWorkoutContext } from '../context/WorkoutContext';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native';

export default function AddWorkoutScreen() {
  const { addWorkout } = useWorkoutContext();
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [photoUri, setPhotoUri] = useState(null);
  const [location, setLocation] = useState(null);
  const [date, setDate] = useState(null);

  const handleGetLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Brak dostępu do lokalizacji');
      return;
    }

    let loc = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });
  };

  const handleTakePhoto = async () => {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Brak dostępu do kamery');
      return;
    }

    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  };

  const handleAddWorkout = () => {
    if (!title) {
      Alert.alert('Wpisz nazwę treningu');
      return;
    }

    const newWorkout = {
      id: uuid.v4(),
      title,
      location,
      date: new Date().toLocaleString(),
      photoUri,
    };

    addWorkout(newWorkout);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nazwa treningu</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="np. Siłownia, Cardio"
      />

      <Button title="Dodaj zdjęcie" onPress={handleTakePhoto} />
      {photoUri && <Image source={{ uri: photoUri }} style={styles.image} />}

      <Button title="Pobierz lokalizację" onPress={handleGetLocation} />
      {location && (
        <Text style={styles.info}>
          Lokalizacja: {location.latitude.toFixed(4)},{' '}
          {location.longitude.toFixed(4)}
        </Text>
      )}

      <Button title="Dodaj trening" onPress={handleAddWorkout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 12,
  },
  info: {
    marginVertical: 8,
  },
});
