import {Text, View} from 'react-native';
import React, {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//Screens
import Main from '../screens/Main';
import RegisterNavigator from './RegisterNavigator';
import Login from '../screens/AuthScreens/Login';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator 
    >
      <Stack.Screen
        name="Main"
        component={Main}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Register"
        component={RegisterNavigator}
        options={{
          animation: 'slide_from_right',
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: '#1c1d22'},
          headerShadowVisible: false,
          headerTitle: 'Create account',
          headerTitleStyle: {fontSize: 17},
          fullScreenGestureEnabled:true,
          headerShown:false
     
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
