// Файл: screens/WelcomeScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useWindowDimensions } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  const { width, height } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>FitJourney</Text>

      <Image
        source={require('../assets/undraw_morning-workout_73u9.png')}
        style={[
        styles.image,
        { maxHeight: height * 0.4 } 
        ]}
        resizeMode="contain"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')} //На главный экран
      >
        <Text style={styles.buttonText}>Zaczynamy</Text>
      </TouchableOpacity>
    </View>
  );
}

//Дизайн
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333333',
  },
  image: {
    width: '90%',
    aspectRatio: 16/9,
    maxHeight: 300,
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#6f3dff',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
