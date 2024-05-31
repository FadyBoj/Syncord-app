import {Text, View} from 'react-native';
import React, {Component, useState} from 'react';
import DashboardContextProvider from '../context/DashboardContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

//screens
import Home from '../screens/Home';
import Chats from '../screens/Chats';
import Friends from '../screens/Friends';
import Notifications from '../screens/Notifications';
import Settings from '../screens/Settings';

//Components
import MyTabBar from '../components/TabBar/TabBar';

const AppStack = () => {

  return (
      <DashboardContextProvider>
        <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
  
          <Tab.Screen
            name="Messages"
            component={Chats}
          />
          <Tab.Screen
            name="Friends"
            component={Friends}
          />
          <Tab.Screen
            name="Notifications"
            component={Notifications}
          />
          <Tab.Screen
            name="You"
            component={Settings}
          />
        </Tab.Navigator>
      </DashboardContextProvider>
  );
};

export default AppStack;
