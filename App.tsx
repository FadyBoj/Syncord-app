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
import Toast,{BaseToast} from 'react-native-toast-message';
import DashboardContextProvider from './context/DashboardContext';

const Stack = createNativeStackNavigator();

export default function App() {
  try {
    ReactNative.I18nManager.allowRTL(false);
  } catch (error) {
    console.log(error);
  }

  const toastConfig = {
    success: (props:any) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'green' ,backgroundColor:'#26272e'}}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: '400',
          color:'white',
          fontFamily:'Roboto'
        }}
        te
      />
    ),
    error: (props:any) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'red' ,backgroundColor:'#26272e'}}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: '400',
          color:'white',
          fontFamily:'Roboto'
        }}
        te
      />
    )
  } 

  return (
    <AuthProvider>
      <DashboardContextProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="AuthStack"
              component={AuthStack}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AppStack"
              component={AppStack}
              options={{headerShown: false, animation: 'default'}}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast config={toastConfig}/>

      </DashboardContextProvider>
    </AuthProvider>
  );
}
