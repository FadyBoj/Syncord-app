import {createContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthProvider from './context/AuthContext';
import AuthStack from './navigators/AuthStack';
import AppStack from './navigators/AppNavigator';
import {View} from 'react-native';


const Stack = createNativeStackNavigator();

export default function App() {


  return (
    <AuthProvider>
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
            options={{headerShown: false, animation:'default'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
