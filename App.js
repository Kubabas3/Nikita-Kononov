// App.js
import React, { useEffect } from 'react';              // ← добавили useEffect
import { View } from 'react-native';                    // ← обёртка
import AsyncStorage from '@react-native-async-storage/async-storage';  // ← импорт AsyncStorage
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { WorkoutProvider } from './context/WorkoutContext';

export default function App() {
  useEffect(() => {
    // === НИЖЕ ВРЕМЕННЫЙ БЛОК ДЛЯ ОЧИСТКИ ХРАНИЛИЩА ===
    // AsyncStorage.clear()
    //   .then(() => console.log('AsyncStorage wiped!'))
    //   .catch(e => console.error('Failed to clear storage:', e));
    // === КОНЕЦ ВРЕМЕННОГО БЛОКА ===
  }, []);

  return (
    <WorkoutProvider>
      <NavigationContainer>
        <View style={{ flex: 1 }}>
          <AppNavigator />
        </View>
      </NavigationContainer>
    </WorkoutProvider>
  );
}
