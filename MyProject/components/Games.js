import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const Games = ({ navigation }) => {
  const navigateToGuessNumber = () => {
    navigation.navigate('GuessNumber');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Games</Text>
      <TouchableOpacity style={styles.button} onPress={navigateToGuessNumber}>
        <Text style={styles.buttonText}>Guess Number</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} disabled>
        <Text style={styles.buttonText}>To be continued</Text>
      </TouchableOpacity>
      {/* Add more buttons for other games */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#841584',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 12,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Games;
