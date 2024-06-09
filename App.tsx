import {createContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthProvider from './context/AuthContext';
import AuthStack from './navigators/AuthStack';
import AppStack from './navigators/AppNavigator';
import {View} from 'react-native';
import * as ReactNative from 'react-native';
import 'react-native-reanimated';
import 'react-native-gesture-handler';


const Stack = createNativeStackNavigator();

export default function App() {

  try {
    ReactNative.I18nManager.allowRTL(false)
  } catch (error) {
    console.log(error)
  }

  return (
    <AuthProvider>
      <NavigationContainer >
        <Stack.Navigator >
          <Stack.Screen 
            name="AuthStack"
            component={AuthStack}
            options={{headerShown: false,}}
          />
          <Stack.Screen
            name="AppStack"
            component={AppStack}
            options={{headerShown: false, animation:'default'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
