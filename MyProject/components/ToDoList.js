import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, Vibration, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const priorityOptions = ['Important', 'Average', 'Not that important'];

const ToDoList = () => {
  const [eventText, setEventText] = useState('');
  const [priority, setPriority] = useState('');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    retrieveEvents();
  }, []);

  const retrieveEvents = async () => {
    try {
      const storedEvents = await AsyncStorage.getItem('events');
      if (storedEvents !== null) {
        setEvents(JSON.parse(storedEvents));
      }
    } catch (error) {
      console.log('Error retrieving events:', error);
    }
  };

  const saveEvents = async (updatedEvents) => {
    try {
      await AsyncStorage.setItem('events', JSON.stringify(updatedEvents));
      setEvents(updatedEvents);
      console.log('Events saved:', updatedEvents);
    } catch (error) {
      console.log('Error saving events:', error);
    }
  };

  const addEvent = () => {
    if (eventText.trim() !== '' && priority !== '') {
      const newEvent = {
        id: new Date().getTime().toString(),
        event: eventText,
        priority: priority,
        completed: false,
      };
      const updatedEvents = [...events, newEvent];
      saveEvents(updatedEvents);
      setEventText('');
      setPriority('');
      Vibration.vibrate();
    }
  };

  const completeEvent = (id) => {
    const updatedEvents = events.filter((event) => {
      if (event.id === id) {
        
        Vibration.vibrate();
        return false;
      }
      return true;
    });
    saveEvents(updatedEvents);
  };

  const renderEvent = ({ item }) => (
    <View style={[styles.eventContainer, item.completed && styles.completedEvent]}>
      <Text style={styles.eventText}>{item.event}</Text>
      <Text style={styles.priorityText}>{item.priority}</Text>
      {!item.completed && (
        <Button title="Complete" onPress={() => completeEvent(item.id)} color="#FF0000" />
      )}
    </View>
  );

  const showPriorityOptions = () => {
    Alert.alert(
      'Choose Priority',
      null,
      priorityOptions.map((option) => ({
        text: option,
        onPress: () => setPriority(option),
      }))
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Event to Your To-Do List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter event"
          value={eventText}
          onChangeText={setEventText}
        />
        <Button title="Choose Priority" onPress={showPriorityOptions} />
        <Button title="Add" onPress={addEvent} />
      </View>

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderEvent}
        ListEmptyComponent={<Text style={styles.emptyText}>No events</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5FE6',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#AAAAAA',
    borderRadius: 4,
    marginRight: 8,
    paddingHorizontal: 8,
  },
  eventContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 4,
    elevation: 2,
  },
  completedEvent: {
    backgroundColor: '#EEEEEE',
  },
  eventText: {
    flex: 1,
    fontSize: 16,
  },
  priorityText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32,
  },
});

export default ToDoList;
