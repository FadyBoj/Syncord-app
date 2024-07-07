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
import Profile from '../screens/Profile';
import SingleChat from '../screens/SingleChat';

//Components
import MyTabBar from '../components/TabBar/TabBar';

const AppStack = () => {
  const [addFriendModal, setAddFriendModal] = useState(false);
  const openAddFriendModal = () => setAddFriendModal(true);
  const closeAddFriendModal = () => setAddFriendModal(false);

  //Handle user overview
  const [userOv, setUserOv] = useState(false);
  const openUserOv = () => {
    'worklet'; // This line is important for marking the function as a worklet

    setUserOv(true);
  };
  const closeUserOv = () => setUserOv(false);

  return (
    <Stack.Navigator>
      <Stack.Screen name="MainTabs" options={{headerShown: false}}>
        {props => (
          <Tab.Navigator
            {...props}
            tabBar={props => (
              <MyTabBar
                {...props}
                addFriendModal={addFriendModal}
                userOv={userOv}
              />
            )}>
            <Tab.Screen options={{headerShown: false}} name="Friends">
              {props => (
                <Friends
                  {...props}
                  openAddFriendModal={openAddFriendModal}
                  closeAddFriendModal={closeAddFriendModal}
                  addFriendModal={addFriendModal}
                  userOv={userOv}
                  openUserOv={openUserOv}
                  closeUserOv={closeUserOv}
                />
              )}
            </Tab.Screen>
            <Tab.Screen
              name="Notifications"
              component={Notifications}
              options={{
                headerShown: false,
                tabBarBadge: 3,
              }}
            />
            <Tab.Screen
              name="You"
              component={Profile}
              options={{headerShown: false}}
            />
          </Tab.Navigator>
        )}
      </Stack.Screen>
      <Stack.Screen
        name="singleChat"
        component={SingleChat}
        options={{animation: 'ios', headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
