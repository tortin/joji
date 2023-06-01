import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {Button, TextInput} from '@react-native-material/core';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './Screens/loginScreen';
import HomeStack from './navigation/stack';
import MainDrawer from './navigation/drawer';
import MatchScreen from './Screens/matchScreen';
import SwipeableCard from './components/swipeableCard';
import { AuthProvider } from './context/AuthContext';
import AppNav from './navigation/appNav';

export default function App() {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}

