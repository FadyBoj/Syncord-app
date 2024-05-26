import {Text, View} from 'react-native';
import React, {Component, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthProvider from '../context/AuthContext';
const Stack = createNativeStackNavigator();

//screens
import Home from '../screens/Home';
import Chats from '../screens/Chats';
import Friends from '../screens/Friends';
import Notifications from '../screens/Notifications';
import Settings from '../screens/Settings';

const AppStack = () => {

  return (
      <>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false, animation: 'none'}}
          />
          <Stack.Screen
            name="Friends"
            component={Friends}
            options={{headerShown: false, animation: 'none'}}
          />
          <Stack.Screen
            name="Chats"
            component={Chats}
            options={{headerShown: false, animation: 'none'}}
          />
          <Stack.Screen
            name="Notifications"
            component={Notifications}
            options={{headerShown: false, animation: 'none'}}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
            options={{headerShown: false, animation: 'none'}}
          />
        </Stack.Navigator>
      </>
  );
};

export default AppStack;
