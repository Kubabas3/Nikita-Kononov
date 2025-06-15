import React, { useContext, useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  useWindowDimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { WorkoutContext } from '../context/WorkoutContext';

export default function HomeScreen({ navigation }) {
  const { workouts, removeWorkout } = useContext(WorkoutContext);
  const [query, setQuery] = useState('');
  const { width, height } = useWindowDimensions();
  const isPortrait = height >= width;

  // Безопасная фильтрация
  const filteredWorkouts = workouts.filter(w => {
    const title = typeof w.title === 'string' ? w.title : '';
    return title.toLowerCase().includes(query.trim().toLowerCase());
  });

  const renderWorkout = useCallback(
    ({ item }) => (
      <View style={styles.cardWrapper}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate('WorkoutDetails', { workout: item })}
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
    [navigation, removeWorkout]
  );

  return (
    <View style={isPortrait ? styles.portraitContainer : styles.landscapeContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Wyszukiwanie..."
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={filteredWorkouts}
        keyExtractor={(item, index) =>
          item.id != null ? item.id.toString() : index.toString()
        }
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
}

const styles = StyleSheet.create({
  portraitContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    flexDirection: 'column'
  },
  landscapeContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    flexDirection: 'row'
  },
  searchInput: {
    height: 40,
    marginHorizontal: 16,
    marginTop: 30,
    marginBottom: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  listContent: {
    padding: 16
  },
  cardWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 12
  },
  card: {
    flex: 1,
    padding: 16
  },
  title: {
    fontSize: 16,
    color: '#333'
  },
  deleteButton: {
    padding: 12
  },
  fab: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    backgroundColor: '#6f3dff',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4
  }
});
