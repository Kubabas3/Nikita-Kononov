// App.js
import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { WorkoutProvider } from './context/WorkoutContext';
import { SettingsProvider, SettingsContext } from './context/SettingsContext';

function InnerApp() {
  const { theme } = React.useContext(SettingsContext);
  return (
    <WorkoutProvider>
      <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
        <AppNavigator />
      </NavigationContainer>
    </WorkoutProvider>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <InnerApp />
    </SettingsProvider>
  );
}