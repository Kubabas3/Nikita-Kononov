import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { SettingsContext } from '../context/SettingsContext';

export default function SettingsScreen({ navigation }) {
  const {
    translations,
    locale,
    theme,
    changeLocale,
    changeTheme,
    themeStyles
  } = useContext(SettingsContext);
  const s = themeStyles;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: s.background }]}>      
      {/* Заголовок */}
      <View style={styles.titleWrapper}>
        <Text style={[styles.title, { color: s.text }]}>
          {translations.settings}
        </Text>
      </View>

      {/* Выбор темы */}
      <Text style={[styles.sectionLabel, { color: s.secondaryText }]}> {translations.themeLabel}</Text>
      <View style={styles.themeRow}>
        <TouchableOpacity
          style={[
            styles.themeBtn,
            { backgroundColor: theme === 'light' ? s.buttonActive : s.buttonInactive }
          ]}
          onPress={() => changeTheme('light')}
        >
          <Text style={[styles.btnTxt, { color: theme === 'light' ? '#fff' : s.text }]}>
            {translations.light}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.themeBtn,
            { backgroundColor: theme === 'dark' ? s.buttonActive : s.buttonInactive }
          ]}
          onPress={() => changeTheme('dark')}
        >
          <Text style={[styles.btnTxt, { color: theme === 'dark' ? '#fff' : s.text }]}>
            {translations.dark}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Выбор языка */}
      <Text style={[styles.sectionLabel, { color: s.secondaryText }]}>{translations.langLabel}</Text>
      <View style={[styles.pickerContainer, { borderColor: s.border }]}>        
        <Picker
          selectedValue={locale}
          style={{ color: s.text }}
          onValueChange={value => changeLocale(value)}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="Polski" value="pl" />
        </Picker>
      </View>

      {/* Кнопка “Back” */}
      <TouchableOpacity
        style={[styles.backButton, { backgroundColor: s.buttonActive }]}
        onPress={() => navigation.goBack()}
      >
        <Text style={[styles.backButtonText, { color: '#fff' }]}>
          {translations.back}
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  titleWrapper: { alignItems: 'center', marginVertical: 24 },
  title: { fontSize: 24, fontWeight: 'bold' },
  sectionLabel: { fontSize: 16, marginBottom: 8 },
  themeRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  themeBtn: { flex: 1, marginHorizontal: 4, paddingVertical: 12, borderRadius: 20, alignItems: 'center' },
  btnTxt: { fontSize: 14, fontWeight: '600' },
  pickerContainer: { borderWidth: 1, borderRadius: 8, marginBottom: 24 },
  backButton: {
    alignSelf: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    width: '60%',
    marginTop: 'auto',
    marginBottom: 32
  },
  backButtonText: { fontSize: 16, textAlign: 'center' }
});
