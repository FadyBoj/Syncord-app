import {BackHandler} from 'react-native';
import React, {Component, useEffect, useState} from 'react';
import DashboardContextProvider from '../context/DashboardContext';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {IFriend} from '../context/DashboardContext';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

//screens
import Friends from '../screens/Friends';
import Notifications from '../screens/Notifications';
import Profile from '../screens/Profile';
import SingleChat from '../screens/SingleChat';

//Components
import MyTabBar from '../components/TabBar/TabBar';

export interface IUserOv {
  visible: boolean;
  data: IFriend | null;
}

const AppStack = () => {
  const [addFriendModal, setAddFriendModal] = useState(false);
  const openAddFriendModal = () => setAddFriendModal(true);
  const closeAddFriendModal = () => setAddFriendModal(false);

  //Handle user overview
  const [userOv, setUserOv] = useState<IUserOv>({
    visible: false,
    data: null,
  });
  const openUserOv = () => {
    setUserOv(prevdata => {
      return {...prevdata, visible: true};
    });
  };
  const closeUserOv = () => {
    setUserOv(prevdata => {
      return {...prevdata, visible: false};
    });
  };



  return (
    <Stack.Navigator screenOptions={{autoHideHomeIndicator: true}}>
      <Stack.Screen
        name="MainTabs"
        options={{headerShown: false, autoHideHomeIndicator: true}}>
        {props => (
          <Tab.Navigator
            {...props}
            tabBar={props => (
              <MyTabBar
                {...props}
                addFriendModal={addFriendModal}
                userOv={userOv}
                closeUserOv={closeUserOv}
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
                  setUserOv={setUserOv}
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
