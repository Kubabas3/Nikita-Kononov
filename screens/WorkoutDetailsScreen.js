// screens/WorkoutDetailsScreen.js
import React, { useContext } from 'react'; // pobieramy React i hook useContext
import { ScrollView, View, Text, Image, Button, StyleSheet } from 'react-native'; // podstawowe komponenty do layoutu, tekstu i obrazów
import { SettingsContext } from '../context/SettingsContext'; // importujemy kontekst ustawień (motyw i tłumaczenia)

export default function WorkoutDetailsScreen({ route, navigation }) {
  const { workout } = route.params; // otrzymujemy obiekt treningu z parametrów nawigacji
  const { theme, themeStyles: s, translations } = useContext(SettingsContext); // pobieramy aktualny motyw, style i tłumaczenia z kontekstu

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        { backgroundColor: s.background }
      ]}
    >
      {/* tytuł treningu */}
      <Text style={[styles.title, { color: s.text }]}>
        {workout.title}
      </Text>

      {/* jeśli jest zdjęcie, to je pokazujemy */}
      {workout.photoUri && (
        <Image
          source={{ uri: workout.photoUri }}
          style={styles.image}
          resizeMode="contain"
        />
      )}

      {/* jeśli mamy współrzędne, to pokazujemy lokalizację */}
      {workout.location && (
        <Text style={[styles.info, { color: s.text }]}>
          {translations.locationLabel}: {workout.location.latitude.toFixed(4)},{' '}
          {workout.location.longitude.toFixed(4)}
        </Text>
      )}

      {/* wyświetlamy datę treningu */}
      <Text style={[styles.info, { color: s.text }]}>
        {translations.dateLabel}: {workout.date}
      </Text>

      {/* przycisk powrotu */}
      <View style={styles.buttonContainer}>
        <Button
          title={translations.back}
          onPress={() => navigation.goBack()}
          color={s.buttonActive}
        />
      </View>
    </ScrollView>
  );
}

// style ekranu szczegółów treningu
const styles = StyleSheet.create({
  container: {
    padding: 30,          
    flexGrow: 1,          
    justifyContent: 'flex-start', 
  },
  title: {
    fontSize: 24,         
    fontWeight: 'bold',  
    marginBottom: 20,     
    textAlign: 'center',  
  },
  image: {
    width: '100%',        
    height: 300,         
    marginBottom: 20,     
    borderRadius: 8,      
  },
  info: {
    fontSize: 16,         
    marginBottom: 12,     
    textAlign: 'center',  
  },
  buttonContainer: {
    marginTop: 20,       
    alignSelf: 'center',  
    width: '50%',        
  },
});
