// screens/AddWorkoutScreen.js

import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { WorkoutContext } from '../context/WorkoutContext';
import { SettingsContext } from '../context/SettingsContext';

export default function AddWorkoutScreen({ navigation }) {
  const { addWorkout } = useContext(WorkoutContext);
  const { theme, themeStyles: s, translations } = useContext(SettingsContext);

  const [title, setTitle] = useState('');
  const [photoUri, setPhotoUri] = useState(null);
  const [location, setLocation] = useState(null);

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(translations.workoutName, translations.cameraDenied);
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ quality: 0.7 });
    if (!result.cancelled) {
      setPhotoUri(result.uri);
    }
  };

  const fetchLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(translations.workoutName, translations.locationDenied);
      return;
    }
    const loc = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });
  };

  const save = () => {
    const trimmed = title.trim();
    if (trimmed.length < 3) {
      Alert.alert(translations.workoutName, translations.nameTooShort);
      return;
    }
    addWorkout(trimmed, photoUri, location);
    navigation.goBack();
  };

  return (
    <View style={[styles.container, { backgroundColor: s.background }]}>
      <Text style={[styles.label, { color: s.text }]}>{translations.workoutName}</Text>
      <TextInput
        style={[styles.input, { borderColor: s.border, color: s.text }]}
        placeholder={translations.namePlaceholder}
        placeholderTextColor={s.secondaryText}
        value={title}
        onChangeText={setTitle}
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: s.buttonActive }]}
        onPress={takePhoto}
      >
        <Text style={styles.buttonText}>{translations.takePhoto}</Text>
      </TouchableOpacity>
      {photoUri && <Image source={{ uri: photoUri }} style={styles.preview} />}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: s.buttonActive }]}
        onPress={fetchLocation}
      >
        <Text style={styles.buttonText}>{translations.getLocation}</Text>
      </TouchableOpacity>
      {location && (
        <Text style={[styles.locationText, { color: s.text }]}>
          {translations.locationLabel}: {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
        </Text>
      )}

      <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: s.buttonActive }]}
        onPress={save}
      >
        <Text style={styles.saveButtonText}>{translations.addButton}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.backButton, { backgroundColor: s.buttonInactive }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>{translations.back}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:       { flex: 1, padding: 20 },
  label:           { fontSize: 16, marginBottom: 8 },
  input:           { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 16 },
  button:          { padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  buttonText:      { color: '#fff', fontSize: 14 },
  preview:         { width: '100%', height: 200, marginBottom: 12, borderRadius: 8, resizeMode: 'contain' },
  locationText:    { fontSize: 14, marginBottom: 16 },
  saveButton:      { padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 24 },
  saveButtonText:  { color: '#fff', fontSize: 16 },
  backButton:      { padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  backButtonText:  { color: '#fff', fontSize: 16, textAlign: 'center' },
});
