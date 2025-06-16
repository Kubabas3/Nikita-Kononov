// navigation/AppNavigator.js

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsContext } from '../context/SettingsContext';

import WelcomeScreen        from '../screens/WelcomeScreen';
import HomeScreen           from '../screens/HomeScreen';
import AddWorkoutScreen     from '../screens/AddWorkoutScreen';
import WorkoutDetailsScreen from '../screens/WorkoutDetailsScreen';
import ProfileScreen        from '../screens/ProfileScreen';
import SettingsScreen       from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { themeStyles } = React.useContext(SettingsContext);

  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: themeStyles.background }
      }}
    >
      <Stack.Screen name="Welcome"        component={WelcomeScreen} />
      <Stack.Screen name="Home"           component={HomeScreen} />
      <Stack.Screen name="AddWorkout"     component={AddWorkoutScreen} />
      <Stack.Screen name="WorkoutDetails" component={WorkoutDetailsScreen} />
      <Stack.Screen name="Profile"        component={ProfileScreen} />
      <Stack.Screen name="Settings"       component={SettingsScreen} />
    </Stack.Navigator>
  );
}
