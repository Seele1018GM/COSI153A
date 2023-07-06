import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Vibration } from 'react-native';

const GuessNumber = () => {
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [answer, setAnswer] = useState(Math.floor(Math.random() * 100) + 1);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (attempts === 7) {
      setMessage(`Game over! The number was ${answer}.`);
      setGameOver(true);
      Vibration.vibrate()
    }
  }, [attempts]);

  const handleGuess = () => {
    const parsedGuess = parseInt(guess);
    if (isNaN(parsedGuess) || parsedGuess < 1 || parsedGuess > 100) {
      setMessage('Invalid guess. Please enter a number between 1 and 100.');
      return;
    }

    setAttempts(attempts + 1);

    if (parsedGuess === answer) {
      setMessage(`Congratulations! You guessed the number in ${attempts} attempts.`);
      setGameOver(true);
      Vibration.vibrate()
      return;
    }

    if (parsedGuess < answer) {
      setMessage('Too small. Try guessing a larger number.');
    } else {
      setMessage('Too large. Try guessing a smaller number.');
    }
    setGuess('');
  };

  const restartGame = () => {
    setGuess('');
    setAttempts(0);
    setMessage('');
    setGameOver(false);
    setAnswer(Math.floor(Math.random() * 100) + 1);
  };

  const textSize = gameOver ? 20 : 16;
  const inputStyle = [styles.input, { fontSize: textSize }];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guess the Number</Text>
      {gameOver ? (
        <View>
          <Text style={styles.message}>{message}</Text>
          {guess === answer.toString() ? (
            <Text style={styles.result}>You Guessed It!</Text>
          ) : (
            <Text style={styles.result}>You Lost!</Text>
          )}
          <Button title="Restart" onPress={restartGame} />
        </View>
      ) : (
        <View>
          <Text style={styles.message}>{message}</Text>
          <Text style={styles.remainingGuesses}>{`Remaining Guesses: ${7 - attempts}`}</Text>
          <TextInput
            style={inputStyle}
            placeholder="Enter a number between 1 and 100"
            value={guess}
            onChangeText={setGuess}
            keyboardType="numeric"
            editable={!gameOver}
          />
          <Button title="Guess" onPress={handleGuess} disabled={gameOver} />
        </View>
      )}
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
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
  remainingGuesses: {
    fontSize: 16,
    marginBottom: 10,
  },
  result: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default GuessNumber;
