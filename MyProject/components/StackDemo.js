import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GuessNumber from './GuessNumber';
import Games from './Games';
import QRCode from './QRCode';
import AskGPT from './AskGPT';
import ToDoList from './ToDoList';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, styles.gameRoomButton]}
        onPress={() => navigation.navigate('Games')}
      >
        <Text style={[styles.buttonText, styles.gameRoomButtonText]}>Game Room</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.alarmClockButton]}
        onPress={() => navigation.navigate('QRCode')}
      >
        <Text style={[styles.buttonText, styles.alarmClockButtonText]}>QR Code Scanner</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.askGPTButton]}
        onPress={() => navigation.navigate('AskGPT')}
      >
        <Text style={[styles.buttonText, styles.askGPTButtonText]}>Ask GPT</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.toDoListButton]}
        onPress={() => navigation.navigate('ToDoList')}
      >
        <Text style={[styles.buttonText, styles.toDoListButtonText]}>To Do List</Text>
      </TouchableOpacity>
    </View>
  );
};

const ProfileScreen = ({ navigation, route }) => {
  return <Text style={styles.profileText}>This is {route.params.name}'s profile</Text>;
};

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Toolbox', headerTitleStyle: styles.headerTitleStyle }}
        />
        <Stack.Screen name="GuessNumber" component={GuessNumber} />
        <Stack.Screen name="Games" component={Games} />
        <Stack.Screen name="QRCode" component={QRCode} />
        <Stack.Screen name="AskGPT" component={AskGPT} />
        <Stack.Screen name="ToDoList" component={ToDoList} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 200,
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  gameRoomButton: {
    backgroundColor: '#FF6F61',
  },
  gameRoomButtonText: {
    color: '#FFFFFF',
  },
  alarmClockButton: {
    backgroundColor: '#6EC9B7',
  },
  alarmClockButtonText: {
    color: '#FFFFFF',
  },
  askGPTButton: {
    backgroundColor: '#FFC154',
  },
  askGPTButtonText: {
    color: '#000000',
  },
  toDoListButton: {
    backgroundColor: '#A593E0',
  },
  toDoListButtonText: {
    color: '#FFFFFF',
  },
  profileText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
  },
  headerTitleStyle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default MyStack;
