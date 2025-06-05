// Файл со стек-навигацией
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import HomeScreen from '../screens/HomeScreen';
import AddWorkoutScreen from '../screens/AddWorkoutScreen';
import WorkoutDetailsScreen from '../screens/WorkoutDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Создаём стек
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddWorkout" component={AddWorkoutScreen} />
      <Stack.Screen name="WorkoutDetails" component={WorkoutDetailsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
}
