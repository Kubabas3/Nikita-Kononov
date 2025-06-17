// context/WorkoutContext.js — оставляем без изменений!
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SettingsContext } from './SettingsContext';
import * as SecureStore from 'expo-secure-store';

// Контекст для тренировок / Kontekst treningów
export const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  // Массив тренировок / Tablica treningów
  const [workouts, setWorkouts] = useState([]);

  // Загружаем сохранённые тренировки при старте приложения
  // Ładujemy zapisane treningi z AsyncStorage przy uruchomieniu
  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const data = await AsyncStorage.getItem('workouts');
        if (data !== null) setWorkouts(JSON.parse(data));
      } catch (error) {
        console.error('Error loading workouts:', error);
      }
    };
    loadWorkouts();
  }, []);

  // Добавление новой тренировки / Dodawanie nowej sesji treningowej
  const addWorkout = async (title, photoUri, location) => {
    const trimmed = title.trim();
    // Проверяем длину названия (минимум 3 символа)
    // Sprawdzamy długość nazwy (min. 3 znaki)
    if (trimmed.length < 3) {
      throw new Error('Nazwa nie może być krótsza niż 3 znaki.');
    }

    // Создаём объект тренировки / Tworzymy obiekt treningu
    const newWorkout = {
      id: Date.now().toString(),           // уникальный ID / unikalne ID
      title: trimmed,                      // заголовок / tytuł
      photoUri: photoUri || null,          // фото (URI) / zdjęcie (URI)
      location: location || null,          // координаты / lokalizacja
      date: new Date().toLocaleString(),   // дата создания / data utworzenia
    };

    // Добавляем в массив и обновляем состояние / Dodajemy do tablicy i aktualizujemy stan
    const updated = [...workouts, newWorkout];
    setWorkouts(updated);

    // Сохраняем в AsyncStorage и SecureStore
    // Zapisujemy w AsyncStorage i SecureStore (для lastWorkoutId)
    try {
      await AsyncStorage.setItem('workouts', JSON.stringify(updated));
      await SecureStore.setItemAsync('lastWorkoutId', newWorkout.id);
    } catch (error) {
      console.error('Error saving workout or SecureStore:', error);
    }
  };

  // Удаление тренировки по ID / Usuwanie treningu po ID
  const removeWorkout = async id => {
    const updated = workouts.filter(w => w.id !== id);
    setWorkouts(updated);
    try {
      await AsyncStorage.setItem('workouts', JSON.stringify(updated));
    } catch (error) {
      console.error('Error removing workout:', error);
    }
  };

  // Предоставляем данные контекста компонентам-потомкам
  // Udostępniamy dane kontekstu komponentom potomnym
  return (
    <WorkoutContext.Provider value={{ workouts, addWorkout, removeWorkout }}>
      {children}
    </WorkoutContext.Provider>
  );
};

// Хук для получения контекста / Hook do pobierania kontekstu
export const useWorkoutContext = () => useContext(WorkoutContext);
