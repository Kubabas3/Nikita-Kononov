import React, { useContext, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WorkoutContext } from '../context/WorkoutContext';

const HomeScreen = ({ navigation }) => {
  const { workouts, removeWorkout } = useContext(WorkoutContext);

  const renderWorkout = useCallback(
    ({ item }) => (
      <View style={styles.cardWrapper}>
        {/* Навигация передаёт весь объект тренировки */}
        <TouchableOpacity
          style={styles.card}
          onPress={() =>
            navigation.navigate('WorkoutDetails', { workout: item })
          }
        >
          <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => removeWorkout(item.id)}
        >
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      </View>
    ),
    [navigation, removeWorkout],
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={workouts}
        keyExtractor={item => item.id.toString()}
        renderItem={renderWorkout}
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddWorkout')}
      >
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  listContent: {
    padding: 16,
  },
  cardWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 12,
  },
  card: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 16,
    color: '#333',
  },
  deleteButton: {
    padding: 12,
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    backgroundColor: '#2979FF',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
});
