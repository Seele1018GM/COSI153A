import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, Button, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const GPTAnswers = () => {
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    getChatHistory();
  }, []);

  const getChatHistory = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('chatHistory');
      const storedChatHistory = jsonValue != null ? JSON.parse(jsonValue) : [];
      setChatHistory(storedChatHistory);
    } catch (error) {
      console.error('Error retrieving chat history:', error);
    }
  };

  const clearChatHistory = async () => {
    try {
      await AsyncStorage.removeItem('chatHistory');
      setChatHistory([]);
      console.log('Chat history cleared.');
    } catch (error) {
      console.error('Error clearing chat history:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.chatItem}>
      <Text style={styles.questionText}>Question:</Text>
      <Text style={styles.contentText}>{item.question}</Text>
      <Text style={styles.answerText}>Answer:</Text>
      <Text style={styles.contentText}>{item.answer}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chat History</Text>
      <FlatList
        data={chatHistory}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
      />
      <Button title="Clear Chat History" onPress={clearChatHistory} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default GPTAnswers;
