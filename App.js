// Точка входа в приложение
import React from 'react';
// Контейнер для навигации
import { NavigationContainer } from '@react-navigation/native';
// Наш файл со стек-навигацией
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  return (
    // Оборачиваем всё приложение в контейнер навигации
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
