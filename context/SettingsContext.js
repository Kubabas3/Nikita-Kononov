import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import en from '../locales/en.json';
import pl from '../locales/pl.json';

export const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const [theme, setTheme] = useState('light');    // 'light' или 'dark'
  const [locale, setLocale] = useState('en');     // 'en' или 'pl'

  useEffect(() => {
    // при старте загружаем последние значения
    AsyncStorage.getItem('theme').then(t => t && setTheme(t));
    AsyncStorage.getItem('locale').then(l => l && setLocale(l));
  }, []);

  const changeTheme = async newTheme => {
    setTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme);
  };

  const changeLocale = async newLocale => {
    setLocale(newLocale);
    await AsyncStorage.setItem('locale', newLocale);
  };

    // Импортируем словари
  const translations = React.useMemo(() => {
    // динамически подтягиваем нужный JSON
    return locale === 'pl'
      ? require('../locales/pl.json')
      : require('../locales/en.json');
  }, [locale]);
  

  return (
     <SettingsContext.Provider value={{
      theme,
      locale,
      changeTheme,
      changeLocale,
      translations,           // добавляем сюда переводы
    }}>
      {children}
    </SettingsContext.Provider>
  );
}
