import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

const WorkoutDetailsScreen = ({ route, navigation }) => {
  const { workout } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{workout.name}</Text>

      {workout.photoUri && (
        <Image
          source={{ uri: workout.photoUri }}
          style={styles.image}
          resizeMode="contain"
        />
      )}

      {workout.location && (
        <Text style={styles.location}>
          Location: {workout.location.latitude}, {workout.location.longitude}
        </Text>
      )}

      <Button title="Back" onPress={() => navigation.goBack()} />
    </View>
  );
};

export default WorkoutDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  image: {
    width: '90%',
    height: 250,
    marginBottom: 16,
  },
  location: {
    fontSize: 16,
    marginBottom: 16,
  },
});
