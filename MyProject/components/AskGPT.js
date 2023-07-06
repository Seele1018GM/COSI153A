import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, TextInput, Button, FlatList, View, Vibration } from 'react-native';
import axios from 'axios';
import open_api_key from './open_api_key';

const AskGPT = () => {
  const [data, setData] = useState([]);
  const [promptText, setPromptText] = useState('');
  const [prompt, setPrompt] = useState();
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetryAttempts = 3;
  const retryDelay = 5000; // Delay in milliseconds between retries

  const getResponse = async () => {
    try {
      const url = 'https://api.openai.com/v1/chat/completions';
      const config = {
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + open_api_key,
        },
      };
      const msg_data = {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      };
      const response = await axios.post(url, msg_data, config);
      const result = response.data;
      setLoading(false);
      setData(result);
      setRetryCount(0); // Reset the retry count on successful response
      Vibration.vibrate(); // Vibrate when the answer is received
    } catch (error) {
      console.error(error);
      if (error.response?.status === 429) {
        if (retryCount < maxRetryAttempts) {
          // Retry the request after a delay
          setTimeout(() => {
            setRetryCount(retryCount + 1);
            getResponse();
          }, retryDelay);
        } else {
          // Reached maximum retry attempts
          console.log('Maximum retry attempts reached');
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getResponse();
  }, [prompt]);

  const ChatResponse = ({ role, content }) => (
    <View style={{ backgroundColor: 'lightblue', margin: 10, padding: 20 }}>
      <Text>ChatGPT Response to the prompt is:</Text>
      <Text style={{ backgroundColor: 'white' }}>{content}</Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, fontSize: 24, margin: 30 }}>
      <Text style={{ marginTop: 30 }}>Prompt: </Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 10, margin: 10 }}
        onChangeText={(text) => setPromptText(text)}
        value={promptText}
      />

      <Button
        onPress={() => {
          setLoading(true);
          setData([]);
          setPrompt(promptText);
        }}
        title={loading ? 'Awaiting Response' : 'Ask GPT'}
        color="#841584"
        accessibilityLabel="Send"
      />

      <FlatList
        data={data.choices}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => <ChatResponse {...item.message} />}
      />
    </SafeAreaView>
  );
};

export default AskGPT;
