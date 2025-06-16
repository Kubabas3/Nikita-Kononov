import React from 'react';
import { renderHook, act } from '@testing-library/react-hooks';
import { WorkoutProvider, useWorkoutContext } from '../context/WorkoutContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

// Мокаем AsyncStorage и SecureStore
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

jest.mock('expo-secure-store', () => ({
  setItemAsync: jest.fn(),
}));

describe('WorkoutContext', () => {
  beforeEach(() => {
    AsyncStorage.getItem.mockResolvedValue(null);
    AsyncStorage.setItem.mockResolvedValue();
    SecureStore.setItemAsync.mockResolvedValue();
  });

  it('должен добавлять тренировку и сохранять в AsyncStorage и SecureStore', async () => {
    const wrapper = ({ children }) => <WorkoutProvider>{children}</WorkoutProvider>;
    const { result, waitForNextUpdate } = renderHook(() => useWorkoutContext(), { wrapper });

    // Изначально нет тренировок
    expect(result.current.workouts).toEqual([]);

    await act(async () => {
      await result.current.addWorkout('Test Workout', 'uri', { latitude: 1, longitude: 2 });
    });

    // Проверяем, что тренировка добавилась
    expect(result.current.workouts).toHaveLength(1);
    expect(result.current.workouts[0].title).toBe('Test Workout');

    // Проверяем вызовы стейджинга
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'workouts',
      expect.stringContaining('"title":"Test Workout"')
    );
    expect(SecureStore.setItemAsync).toHaveBeenCalled();
  });

  it('должен удалять тренировку и сохранять изменения в AsyncStorage', async () => {
    const wrapper = ({ children }) => <WorkoutProvider>{children}</WorkoutProvider>;
    const { result } = renderHook(() => useWorkoutContext(), { wrapper });

    // Добавляем тренировку
    await act(async () => {
      await result.current.addWorkout('X', null, null);
    });
    const id = result.current.workouts[0].id;

    // Удаляем
    await act(async () => {
      await result.current.removeWorkout(id);
    });

    expect(result.current.workouts).toEqual([]);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('workouts', '[]');
  });
});
