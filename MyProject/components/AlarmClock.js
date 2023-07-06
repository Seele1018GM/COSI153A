import React, { useState } from 'react';
import { View, Button, Platform, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DateTimePickerModal = ({ visible, date, onConfirm, onCancel }) => {
  const handleConfirm = () => {
    onConfirm(date);
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <View>
      {visible && (
        <View>
          <DateTimePicker
            value={date}
            mode="time"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(_, selected) => onConfirm(selected)}
          />
          <Button title="Confirm" onPress={handleConfirm} />
          <Button title="Cancel" onPress={handleCancel} />
        </View>
      )}
    </View>
  );
};

const AlarmClock = () => {
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isPickerVisible, setPickerVisible] = useState(false);

  const handleTimeChange = (selected) => {
    setSelectedTime(selected);
  };

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('alarmTime', selectedTime.toISOString());
      console.log('Alarm time saved:', selectedTime);
    } catch (error) {
      console.log('Error saving alarm time:', error);
    }
  };

  const showPicker = () => {
    setPickerVisible(true);
  };

  const hidePicker = () => {
    setPickerVisible(false);
  };

  return (
    <View>
      <Button title="Select Time" onPress={showPicker} />

      <DateTimePickerModal
        visible={isPickerVisible}
        date={selectedTime}
        onConfirm={handleTimeChange}
        onCancel={hidePicker}
      />

      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

export default AlarmClock;
