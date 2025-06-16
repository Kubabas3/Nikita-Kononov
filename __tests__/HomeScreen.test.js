import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../screens/HomeScreen';
import { WorkoutContext } from '../context/WorkoutContext';

// Мокаем навигацию
const createNavigationMock = () => ({ navigate: jest.fn() });

describe('HomeScreen фильтрация', () => {
  const mockWorkouts = [
    { id: '1', title: 'Push Ups' },
    { id: '2', title: 'Sit Ups' },
    { id: '3', title: 'Squats' },
  ];

  const MockProvider = ({ children }) => {
    const value = {
      workouts: mockWorkouts,
      removeWorkout: jest.fn(),
    };
    return (
      <WorkoutContext.Provider value={value}>
        {children}
      </WorkoutContext.Provider>
    );
  };

  it('показывает только совпадающие с запросом элементы', () => {
    const navigation = createNavigationMock();
    const { getByPlaceholderText, queryByText } = render(
      <MockProvider>
        <HomeScreen navigation={navigation} />
      </MockProvider>
    );

    // До ввода – все видны
    expect(queryByText('Push Ups')).not.toBeNull();
    expect(queryByText('Sit Ups')).not.toBeNull();
    expect(queryByText('Squats')).not.toBeNull();

    // Фильтруем по 'sit'
    fireEvent.changeText(getByPlaceholderText('Wyszukiwanie...'), 'sit');
    expect(queryByText('Push Ups')).toBeNull();
    expect(queryByText('Sit Ups')).not.toBeNull();
    expect(queryByText('Squats')).toBeNull();
  });
});
