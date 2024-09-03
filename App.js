import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import Stack_navigation from './src/navigation/stack';

const App = () => {
  return (
    <NavigationContainer>
   <Stack_navigation/>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})