import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const Camera = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scannedData, setScannedData] = useState(null);
  const scannerRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScannedData(data);
  };

  const openScannedUrl = async () => {
    if (scannedData) {
      try {
        const url = scannedData.startsWith('http://') || scannedData.startsWith('https://')
          ? scannedData
          : `http://${scannedData}`;
        const supported = await Linking.canOpenURL(url);
        if (supported) {
          await Linking.openURL(url);
        } else {
          console.log("Don't know how to open URL: " + url);
        }
      } catch (error) {
        console.error('An error occurred while opening the URL:', error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <BarCodeScanner
        ref={scannerRef}
        onBarCodeScanned={scannedData ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scannedData && (
        <TouchableOpacity style={styles.linkButton} onPress={openScannedUrl}>
          <Text style={styles.linkText}>{scannedData}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkButton: {
    marginVertical: 20,
  },
  linkText: {
    fontSize: 18,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default Camera;
