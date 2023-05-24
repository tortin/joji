import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Button, TextInput} from '@react-native-material/core';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './Screens/loginScreen';
import HomeStack from './navigation/stack';
import MainScreen from './Screens/mainScreen';

export default function App() {
  return (
    <NavigationContainer>
      <HomeStack />
    </NavigationContainer>
  );
}

