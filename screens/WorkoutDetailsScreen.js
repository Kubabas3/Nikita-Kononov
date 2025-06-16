// screens/WorkoutDetailsScreen.js

import React, { useContext } from 'react';
import { ScrollView, View, Text, Image, Button, StyleSheet } from 'react-native';
import { SettingsContext } from '../context/SettingsContext';

export default function WorkoutDetailsScreen({ route, navigation }) {
  const { workout } = route.params;
  const { theme, themeStyles: s, translations } = useContext(SettingsContext);

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: s.background }]}>
      <Text style={[styles.title, { color: s.text }]}>{workout.title}</Text>

      {workout.photoUri && (
        <Image
          source={{ uri: workout.photoUri }}
          style={styles.image}
          resizeMode="contain"
        />
      )}

      {workout.location && (
        <Text style={[styles.info, { color: s.text }]}>
          {translations.locationLabel}: {workout.location.latitude.toFixed(4)},{' '}
          {workout.location.longitude.toFixed(4)}
        </Text>
      )}

      <Text style={[styles.info, { color: s.text }]}>
        {translations.dateLabel}: {workout.date}
      </Text>

      <View style={styles.buttonContainer}>
        <Button
          title={translations.back}
          onPress={() => navigation.goBack()}
          color={s.buttonActive}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
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
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 20,
    alignSelf: 'center',
    width: '50%',
  },
});
