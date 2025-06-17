// screens/HomeScreen.js

import React, { useContext, useCallback, useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WorkoutContext } from '../context/WorkoutContext';
import { SettingsContext } from '../context/SettingsContext';

export default function HomeScreen({ navigation }) {
  const { workouts, removeWorkout } = useContext(WorkoutContext);
  const { theme, themeStyles: s, translations } = useContext(SettingsContext);
  const [query, setQuery] = useState('');
  const { width, height } = useWindowDimensions();
  const isPortrait = height >= width;

  // Konfigurujemy nagłówek: tło, kolor ikony, przycisk ustawień
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerStyle: { backgroundColor: s.background },
      headerTintColor: s.icon,
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={{ marginRight: 16 }}>
          <Ionicons name="settings-outline" size={24} color={s.icon} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, s]);

  // Renderowanie jednego elementu listy
  const renderWorkout = useCallback(
    ({ item }) => (
      <View style={[styles.cardWrapper, { backgroundColor: s.card }]}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('WorkoutDetails', { workout: item })}
        >
          <Text style={[styles.title, { color: s.text }]}>{item.title}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removeWorkout(item.id)} style={styles.deleteButton}>
          <Ionicons
            name="trash-outline"
            size={24}
            color={theme === 'dark' ? '#ff6666' : 'red'}
          />
        </TouchableOpacity>
      </View>
    ),
    [navigation, removeWorkout, s]
  );

  // Filtrowanie według zapytania
  const filtered = workouts.filter(w => {
    const title = w.title || '';
    return title.toLowerCase().includes(query.trim().toLowerCase());
  });

  return (
    <View
      style={[
        isPortrait ? styles.portraitContainer : styles.landscapeContainer,
        { backgroundColor: s.background },
      ]}
    >
      <TextInput
        key={theme}
        style={[styles.searchInput, { borderColor: s.border, color: s.text }]}
        placeholder={translations.searchPlaceholder}
        placeholderTextColor={s.secondaryText}
        value={query}
        onChangeText={setQuery}
      />

      <FlatList
        data={filtered}
        keyExtractor={item => item.id}
        renderItem={renderWorkout}
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity
        style={[styles.fab, { backgroundColor: s.buttonActive }]}
        onPress={() => navigation.navigate('AddWorkout')}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

// style ekranu
const styles = StyleSheet.create({
  portraitContainer: {
    flex: 1,
    padding: 16,
  },
  landscapeContainer: {
    flex: 1,
    padding: 16,
    flexDirection: 'row',
  },
  searchInput: {
    height: 40,
    marginHorizontal: 16,
    marginTop: 30,
    marginBottom: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
  },
  listContent: {
    padding: 16,
  },
  cardWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 12,
  },
  card: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 16,
  },
  deleteButton: {
    padding: 12,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
});
