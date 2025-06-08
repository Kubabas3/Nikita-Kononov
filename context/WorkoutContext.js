import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const data = await AsyncStorage.getItem('workouts');
        if (data !== null) {
          setWorkouts(JSON.parse(data));
        }
      } catch (error) {
        console.error('Error loading workouts:', error);
      }
    };
    loadWorkouts();
  }, []);

  const addWorkout = async (workout) => {
    const updated = [...workouts, workout];
    setWorkouts(updated);
    try {
      await AsyncStorage.setItem('workouts', JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving workout:', error);
    }
  };

  const removeWorkout = async (id) => {
    const updated = workouts.filter((w) => w.id !== id);
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
