import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Alert,
  ScrollView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { WorkoutContext } from '../context/WorkoutContext';
import { SettingsContext } from '../context/SettingsContext';

export default function AddWorkoutScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [photoUri, setPhotoUri] = useState(null);
  const [location, setLocation] = useState(null);
  const { addWorkout } = useContext(WorkoutContext);
  const { translations } = useContext(SettingsContext);

  // Съёмка фото
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

  // Получение локации
  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Błąd', 'Dostęp do lokalizacji zabroniony.');
      return;
    }
    const loc = await Location.getCurrentPositionAsync();
    setLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
  };

  // Сохранение тренировки
  const saveHandler = async () => {
    const trimmed = title.trim();
    if (trimmed.length < 3) {
      Alert.alert(
        translations.workoutName,
        translations.nameTooShort
      );
      return;
    }
    try {
      // вызываем addWorkout так, как в старом коде: title, photoUri, location
      await addWorkout(trimmed, photoUri, location);
      navigation.navigate('Home');
    } catch (e) {
      Alert.alert('Błąd', e.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>{translations.workoutName}</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder={translations.namePlaceholder}
      />

      <Button
        title={translations.takePhoto}
        onPress={takePhoto}
        color="#6f3dff"
      />
      {photoUri && <Image source={{ uri: photoUri }} style={styles.image} />}

      <View style={{ height: 16 }} />
      <Button
        title={translations.getLocation}
        onPress={getLocation}
        color="#6f3dff"
      />
      {location && (
        <Text style={styles.location}>
          {location.latitude}, {location.longitude}
        </Text>
      )}

      <View style={{ height: 24 }} />
      <Button
        title={translations.addButton}
        onPress={saveHandler}
        color="#6f3dff"
      />

      <View style={{ marginTop: 12 }}>
        <Button
          title={translations.back}
          onPress={() => navigation.navigate('Home')}
          color="#6f3dff"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 18, marginBottom: 10, color: '#333' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 4, marginBottom: 16, padding: 8 },
  image: { width: '100%', aspectRatio: 16 / 9, marginVertical: 16, borderRadius: 8 },
  location: { fontSize: 16, marginTop: 8, marginBottom: 16, color: '#333' },
});
