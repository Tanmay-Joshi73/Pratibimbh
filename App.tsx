import React from 'react';
import { View, Text, StyleSheet, StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './Components/HomeScreen/HomeScreen';
import AppNavigation from './Navigation';
export default function App() {
  const isDarkMode = useColorScheme() === 'dark';
  return <AppNavigation />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
