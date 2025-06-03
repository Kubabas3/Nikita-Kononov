// Главный экран приложения
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>🏠 Главный экран</Text>
      {/* Кнопка для перехода на экран добавления */}
      <Button title="Добавить тренировку" onPress={() => navigation.navigate('AddWorkout')} />
    </View>
  );
}
