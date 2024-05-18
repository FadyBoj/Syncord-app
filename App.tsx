import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigationContainer from './navigators/AppNavigationContainer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './navigators/AuthStack';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
        <AuthStack/>
    </NavigationContainer>
  );
}