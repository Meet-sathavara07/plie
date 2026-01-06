import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';

const API_BASE_URL = 'http://3.7.81.243/projects/plie-api/public/api';

export default function ApiTest() {
  const [testResult, setTestResult] = useState<string>('');

  const showCurrentToken = async () => {
    const storedToken = await AsyncStorage.getItem('userToken');
    const userData = await AsyncStorage.getItem('userData');
    const user = userData ? JSON.parse(userData) : null;
    setTestResult(`Stored Token: ${storedToken || 'None'}\nUser: ${user ? user.usr_email : 'None'}`);
  };

  const testLoginAPI = async () => {
    try {
      const formData = new FormData();
      formData.append('email', 'testpracticaluser001@mailinator.com');
      formData.append('password', 'Test@123');

      const response = await axios.post(`${API_BASE_URL}/login`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setTestResult(`Login Success: Token = ${response.data.data.token}`);
    } catch (error: any) {
      setTestResult(`Login Error: ${error.message}`);
    }
  };

  const testEventsAPI = async () => {
    try {
      const authToken = await AsyncStorage.getItem('userToken');
      if (!authToken) {
        setTestResult('No token found. Please login first.');
        return;
      }

      console.log('Testing with token:', authToken);

      const formData = new FormData();
      
      const response = await axios.post(`${API_BASE_URL}/events-listing`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${authToken}`,
        },
      });
      
      setTestResult(`Events Success: Found ${response.data.data?.events?.length || 0} events`);
    } catch (error: any) {
      setTestResult(`Events Error: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>API Test</Text>
      
      <TouchableOpacity style={styles.button} onPress={showCurrentToken}>
        <Text style={styles.buttonText}>Show Current Token</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={testLoginAPI}>
        <Text style={styles.buttonText}>Test Login API</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={testEventsAPI}>
        <Text style={styles.buttonText}>Test Events API</Text>
      </TouchableOpacity>
      
      {testResult ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{testResult}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = ScaledSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ff4757',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  resultContainer: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  resultText: {
    fontSize: 12,
    fontFamily: 'monospace',
  },
});