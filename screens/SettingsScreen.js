// screens/SettingsScreen.js

import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SettingsContext } from '../context/SettingsContext';

export default function SettingsScreen({ navigation }) {
  const { theme, changeTheme, locale, changeLocale, translations } = useContext(SettingsContext);

  return (
    <SafeAreaView style={[styles.container, theme === 'dark' ? styles.darkBg : styles.lightBg]}>
      {/* Заголовок */}
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>{translations.settings}</Text>
      </View>

      {/* Выбор темы */}
      <Text style={styles.sectionLabel}>{translations.themeLabel}</Text>
      <View style={styles.themeRow}>
        <TouchableOpacity
          style={[styles.themeBtn, theme === 'light' ? styles.selectedBtn : null]}
          onPress={() => changeTheme('light')}
        >
          <Text style={theme === 'light' ? styles.selectedTxt : styles.btnTxt}>
            {translations.light}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.themeBtn, theme === 'dark' ? styles.selectedBtn : null]}
          onPress={() => changeTheme('dark')}
        >
          <Text style={theme === 'dark' ? styles.selectedTxt : styles.btnTxt}>
            {translations.dark}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Выбор языка */}
      <Text style={styles.sectionLabel}>{translations.langLabel}</Text>
      <Picker
        selectedValue={locale}
        style={styles.picker}
        onValueChange={value => changeLocale(value)}
      >
        <Picker.Item label="English" value="en" />
        <Picker.Item label="Polski"  value="pl" />
      </Picker>

      {/* Кнопка “Back” внизу экрана */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>{translations.back}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  lightBg: {
    backgroundColor: '#fff',
  },
  darkBg: {
    backgroundColor: '#222',
  },

  titleWrapper: {
    alignItems: 'center',
    marginVertical: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },

  sectionLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },

  themeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  themeBtn: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#ccc',
    alignItems: 'center',
  },
  selectedBtn: {
    backgroundColor: '#6f3dff',
  },
  btnTxt: {
    fontSize: 14,
    color: '#333',
  },
  selectedTxt: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },

  picker: {
    marginBottom: 32,
    color: '#333',
  },

  backButton: {
    alignSelf: 'center',
    backgroundColor: '#6f3dff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    position: 'absolute',
    bottom: 50,
    width: '60%',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});
