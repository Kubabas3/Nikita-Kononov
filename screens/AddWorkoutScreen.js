// screens/AddWorkoutScreen.js
import React, { useState, useContext } from 'react';  
// useState — хук dla stanu lokalnego (np. title, photoUri)  
// useContext — хук dla dostępu do kontekstów globalnych (WorkoutContext, SettingsContext)
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

export default function AddWorkoutScreen({ navigation }) { //Komponent ekranu dodawania nowego treningu

  const { addWorkout } = useContext(WorkoutContext); //addWorkout — funkcja z kontekstu WorkoutContext służąca do dodawania treningu
  const { themeStyles: s, translations } = useContext(SettingsContext);  
  const [title, setTitle] = useState('');  
  const [photoUri, setPhotoUri] = useState(null);  
  const [location, setLocation] = useState(null); 

  const takePhoto = async () => {// Funkcja uruchamiania aparatu fotograficznego
    const { status } = await ImagePicker.requestCameraPermissionsAsync(); // Prosimy o zgodę na użycie kamery
    if (status !== 'granted') {
      Alert.alert(translations.workoutName, translations.cameraDenied); // Jeśli nie uzyskano zgody — wyświetlamy alert
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ quality: 0.7 }); // Uruchomienie kamery
    if (!result.canceled && result.assets?.length) {
      setPhotoUri(result.assets[0].uri); // Zapisujemy adres URI wykonanego zdjęcia
    }
  };

  const fetchLocation = async () => { // Funkcja uzyskiwania aktualnej lokalizacji
    const { status } = await Location.requestForegroundPermissionsAsync(); 
    if (status !== 'granted') {
      Alert.alert(translations.workoutName, translations.locationDenied);
      // Jeśli nie otrzymano — wyświetlamy alert
      return;
    }
    const loc = await Location.getCurrentPositionAsync({}); // Otrzymujemy współrzędne / получаем координаты
    setLocation({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    }); //Zapisujemy szerokość i długość geograficzną
  };

  const save = () => { // Funkcja zapisywania nowego treningu
    const trimmed = title.trim();
    if (trimmed.length < 3) {
      Alert.alert(translations.workoutName, translations.nameTooShort); // Nazwa jest zbyt krótka — ostrzegamy
      return;
    }
    addWorkout(trimmed, photoUri, location);
    navigation.goBack(); // Wracamy do poprzedniego ekranu
  };

  return (
    <View style={[styles.container, { backgroundColor: s.background }]}>
      {/* Główny kontener z tłem z motywu */}

      <Text style={[styles.label, { color: s.text }]}>
        {translations.workoutName}
      </Text>
      {/* Nagłówek pola wprowadzania nazwy treningu */}

      <TextInput
        style={[styles.input, { borderColor: s.border, color: s.text }]}
        placeholder={translations.namePlaceholder}
        placeholderTextColor={s.secondaryText}
        value={title}
        onChangeText={setTitle} // Podczas wprowadzania tekstu aktualizujemy stan /title.
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: s.buttonActive }]}
        onPress={takePhoto}
      >
        <Text style={styles.buttonText}>{translations.takePhoto}</Text>
      </TouchableOpacity>
      {/* Przycisk „Zrób zdjęcie” */}

      {photoUri && (
        <Image
          source={{ uri: photoUri }}
          style={styles.preview}
          resizeMode="contain"
        />
      )}
      {/* Podgląd wykonanego zdjęcia */}

      <TouchableOpacity
        style={[styles.button, { backgroundColor: s.buttonActive }]}
        onPress={fetchLocation}
      >
        <Text style={styles.buttonText}>{translations.getLocation}</Text>
      </TouchableOpacity>
      {/* Przycisk „Pobierz lokalizację” */}

      {location && (
        <Text style={[styles.locationText, { color: s.text }]}>
          {translations.locationLabel}: {location.latitude.toFixed(4)},{' '}
          {location.longitude.toFixed(4)}
        </Text>
      )}
      {/* Wyświetlanie współrzędnych, jeśli location !== null */}

      <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: s.buttonActive }]}
        onPress={save}
      >
        <Text style={styles.saveButtonText}>{translations.addButton}</Text>
      </TouchableOpacity>
      {/* Przycisk „Dodaj trening” */}

      <TouchableOpacity
        style={[styles.backButton, { backgroundColor: s.buttonInactive }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>{translations.back}</Text>
      </TouchableOpacity>
      {/* Przycisk „Back” do powrotu bez zapisywania */}
    </View>
  );
}

// style ekranu
const styles = StyleSheet.create({
  container:       { flex: 1, padding: 20 },
  label:           { fontSize: 16, marginBottom: 8 },
  input:           { borderWidth: 1, borderRadius: 8, padding: 10, marginBottom: 16 },
  button:          { padding: 12, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  buttonText:      { color: '#fff', fontSize: 14 },
  preview:         { width: '100%', height: 200, marginBottom: 12, borderRadius: 8 },
  locationText:    { fontSize: 14, marginBottom: 16 },
  saveButton:      { padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 24 },
  saveButtonText:  { color: '#fff', fontSize: 16 },
  backButton:      { padding: 14, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  backButtonText:  { color: '#fff', fontSize: 16, textAlign: 'center' },
});
