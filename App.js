// App.js

import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { WorkoutProvider } from './context/WorkoutContext';
import { SettingsProvider, SettingsContext } from './context/SettingsContext';

function InnerApp() {
  const { theme, themeStyles } = React.useContext(SettingsContext);

  const baseTheme = theme === 'dark' ? DarkTheme : DefaultTheme;
  const navTheme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      background: themeStyles.background,
      card:       themeStyles.background,
      text:       themeStyles.text,
    },
  };

  return (
    <View style={{ flex: 1, backgroundColor: themeStyles.background }}>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
      <WorkoutProvider>
        <NavigationContainer theme={navTheme}>
          <AppNavigator />
        </NavigationContainer>
      </WorkoutProvider>
    </View>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <InnerApp />
    </SettingsProvider>
  );
}
