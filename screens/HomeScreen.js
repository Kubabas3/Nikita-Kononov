import React from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useWorkoutContext } from '../context/WorkoutContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const { workouts, removeWorkout } = useWorkoutContext();
  const navigation = useNavigation();

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const renderItem = ({ item }) => (
    <View style={styles.workoutItem}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>
        {item.category && <Text style={styles.category}>{item.category}</Text>}
        {item.location && (
          <Text style={styles.info}>
            📍 {item.location.latitude.toFixed(4)}, {item.location.longitude.toFixed(4)}
          </Text>
        )}
        {item.timestamp && (
          <Text style={styles.info}>🕒 {formatDate(item.timestamp)}</Text>
        )}
      </View>
      {item.photo && (
        <Image source={{ uri: item.photo }} style={styles.photo} />
      )}
      <TouchableOpacity onPress={() => removeWorkout(item.id)}>
        <Ionicons name="trash" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No workouts added yet.</Text>}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddWorkout')}
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  workoutItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    padding: 15,
    marginVertical: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  category: {
    fontSize: 14,
    color: '#555',
  },
  info: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  photo: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginLeft: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    right: 30,
  },
  addButtonText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
});
