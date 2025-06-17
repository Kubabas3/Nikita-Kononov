import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SettingsContext } from '../context/SettingsContext';

export default function SettingsScreen({ navigation }) {
  const { theme, changeTheme, locale, changeLocale, translations } = useContext(SettingsContext);
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      {/* Nagłówek pośrodku */}
      <Text style={styles.title}>{translations.settings}</Text>

      {/* motyw aplikacji */}
      <Text style={styles.label}>{translations.themeLabel}</Text>
      <View style={styles.switchRow}>
        {['light','dark'].map(t => (
          <TouchableOpacity
            key={t}
            style={[
              styles.themeButton,
              theme === t && styles.themeButtonActive
            ]}
            onPress={() => changeTheme(t)}
          >
            <Text
              style={[
                styles.themeText,
                theme === t && styles.themeTextActive
              ]}
            >
              {translations[t]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Język interfejsu */}
      <Text style={[styles.label, { marginTop: 24 }]}>
        {translations.langLabel}
      </Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={locale}
          onValueChange={changeLocale}
          style={styles.picker}
          dropdownIconColor={theme === 'dark' ? '#fff' : '#333'}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Polski"  value="pl" />
        </Picker>
      </View>

      {/* Przycisk „Powrót” na dole */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backText}>{translations.back}</Text>
      </TouchableOpacity>
    </View>
  );
}

// style ekranu
const getStyles = theme => {
  const isDark = theme === 'dark';
  return StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: isDark ? '#000' : '#fff',
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#333',
      textAlign: 'center',
      marginVertical: 16,
    },
    label: {
      fontSize: 16,
      color: isDark ? '#ddd' : '#555',
      marginBottom: 8,
    },
    switchRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    themeButton: {
      flex: 1,
      paddingVertical: 12,
      marginHorizontal: 4,
      borderRadius: 8,
      backgroundColor: isDark ? '#222' : '#eee',
      alignItems: 'center',
    },
    themeButtonActive: {
      backgroundColor: '#6f3dff',
    },
    themeText: {
      color: isDark ? '#fff' : '#333',
      fontSize: 16,
      fontWeight: '500',
    },
    themeTextActive: {
      color: '#fff',
    },
    pickerWrapper: {
      borderWidth: 1,
      borderColor: isDark ? '#555' : '#ccc',
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: isDark ? '#111' : '#fafafa',
    },
    picker: {
      height: 48,
      width: '100%',
      color: isDark ? '#fff' : '#333',
      backgroundColor: isDark ? '#111' : '#fafafa',
      marginVertical: Platform.OS === 'android' ? 0 : -4, // убираем лишний отступ на iOS/Web
    },
    backButton: {
      marginTop: 'auto',
      backgroundColor: '#6f3dff',
      paddingVertical: 14,
      borderRadius: 12,
      alignItems: 'center',
      marginBottom: 40,
    },
    backText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });
};
