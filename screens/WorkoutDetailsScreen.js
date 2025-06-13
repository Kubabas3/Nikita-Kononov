import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Button } from 'react-native';

const WorkoutDetailsScreen = ({ route, navigation }) => {
  const { workout } = route.params;
  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);
  useEffect(() => {
  let interval;
  if (running) interval = setInterval(() => setCount(c => c + 1), 1000);
  return () => clearInterval(interval);
}, [running]);

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
        <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{count}s</Text>
        <Button
          title={running ? 'Stop' : 'Start'}
          onPress={() => setRunning(r => !r)}
    />
      <Button title="Reset" onPress={() => setCount(0)} />
    </View>
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
    width: '100%',
    aspectRatio: 16 / 9,
    marginBottom: 16,
  },
  location: {
    fontSize: 16,
    marginBottom: 16,
  },
  timerContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
},
});
