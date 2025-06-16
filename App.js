// App.js
import React from 'react';
import { View } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './navigation/AppNavigator';
import { WorkoutProvider } from './context/WorkoutContext';
import { SettingsProvider, SettingsContext } from './context/SettingsContext';

function InnerApp() {
  const { theme } = React.useContext(SettingsContext);
  return (
    <SettingsProvider>
      <WorkoutProvider>
        <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
         <View style={{ flex: 1 }}>
           <AppNavigator />
          </View>
        </NavigationContainer>
      </WorkoutProvider>
    </SettingsProvider>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <InnerApp />
    </SettingsProvider>
  );
}
