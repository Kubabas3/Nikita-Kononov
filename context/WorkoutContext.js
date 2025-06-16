// context/WorkoutContext.js — оставляем без изменений!
import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SettingsContext } from './SettingsContext';
import * as SecureStore from 'expo-secure-store';

export const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);

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

  const addWorkout = async (title, photoUri, location) => {
    const trimmed = title.trim();
    if (trimmed.length < 3) {
      throw new Error('Nazwa nie może być krótsza niż 3 znaki.');
    }

    const newWorkout = {
      id: Date.now().toString(),
      title: trimmed,
      photoUri: photoUri || null,
      location: location || null,
      date: new Date().toLocaleString(),
    };

    const updated = [...workouts, newWorkout];
    setWorkouts(updated);

    try {
      await AsyncStorage.setItem('workouts', JSON.stringify(updated));
      await SecureStore.setItemAsync('lastWorkoutId', newWorkout.id);
    } catch (error) {
      console.error('Error saving workout or SecureStore:', error);
    }
  };

  const removeWorkout = async id => {
    const updated = workouts.filter(w => w.id !== id);
    setWorkouts(updated);
    try {
      await AsyncStorage.setItem('workouts', JSON.stringify(updated));
    } catch (error) {
      console.error('Error removing workout:', error);
    }
  };

  return (
    <WorkoutContext.Provider value={{ workouts, addWorkout, removeWorkout }}>
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkoutContext = () => useContext(WorkoutContext);
