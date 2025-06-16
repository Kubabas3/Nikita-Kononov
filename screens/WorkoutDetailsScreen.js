// screens/WorkoutDetailsScreen.js

import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SettingsContext } from '../context/SettingsContext';

export default function WorkoutDetailsScreen({ route, navigation }) {
  const { workout } = route.params;
  const { translations } = useContext(SettingsContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Название тренировки */}
      <Text style={styles.title}>{workout.title}</Text>

      {/* Фото — сохраняем соотношение сторон */}
      {workout.photoUri && (
        <Image
          source={{ uri: workout.photoUri }}
          style={styles.image}
          resizeMode="contain"
        />
      )}

      {/* Локация */}
      {workout.location && (
        <Text style={styles.info}>
          {translations.locationLabel}: {workout.location.latitude.toFixed(4)},{' '}
          {workout.location.longitude.toFixed(4)}
        </Text>
      )}

      {/* Дата */}
      <Text style={styles.info}>
        {translations.dateLabel}: {workout.date}
      </Text>

      {/* Кнопка «Назад» */}
      <View style={styles.buttonContainer}>
        <Button
          title={translations.back}
          onPress={() => navigation.goBack()}
          color="#6f3dff"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    backgroundColor: '#fff',
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
    borderRadius: 8,
  },
  info: {
    fontSize: 16,
    marginBottom: 12,
    color: '#333',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    alignSelf: 'center',
    width: '50%',
  },
});
