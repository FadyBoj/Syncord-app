import {Text, View} from 'react-native';
import React, {Component, useState} from 'react';
import DashboardContextProvider from '../context/DashboardContext';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

//screens
import Home from '../screens/Home';
import Chats from '../screens/Chats';
import Friends from '../screens/Friends';
import Notifications from '../screens/Notifications';
import Settings from '../screens/Settings';
import SingleChat from '../screens/SingleChat';

//Components
import MyTabBar from '../components/TabBar/TabBar';

const AppStack = () => {
  return (
    <DashboardContextProvider>
      <Stack.Navigator>
        <Stack.Screen name="MainTabs" options={{headerShown: false}}>
          {props => (
            <Tab.Navigator {...props} tabBar={props => <MyTabBar {...props} />}>
              <Tab.Screen name="Messages" component={Chats} />
              <Tab.Screen
                options={{headerShown: false}}
                name="Friends"
                component={Friends}
              />
              <Tab.Screen name="Notifications" component={Notifications} />
              <Tab.Screen name="You" component={Settings} />
            </Tab.Navigator>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="singleChat"
          component={SingleChat}
          options={{animation: 'ios',headerShown:false}}
        />
      </Stack.Navigator>
    </DashboardContextProvider>
  );
};

export default AppStack;
