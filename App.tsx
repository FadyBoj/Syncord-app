import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './navigators/AuthStack';
import AppStack from './navigators/AppNavigator';
import { View, SafeAreaView, StyleSheet, StatusBar, Platform } from 'react-native';
import * as ReactNative from 'react-native';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import Toast, { BaseToast } from 'react-native-toast-message';
import DashboardContextProvider from './context/DashboardContext';

const Stack = createNativeStackNavigator();

export default function App() {
  try {
    ReactNative.I18nManager.allowRTL(false);
  } catch (error) {
    console.log(error);
  }

  const toastConfig = {
    success: (props: any) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'green', backgroundColor: '#26272e' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: '400',
          color: 'white',
          fontFamily: 'Roboto',
        }}
      />
    ),
    error: (props: any) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'red', backgroundColor: '#26272e' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: '400',
          color: 'white',
          fontFamily: 'Roboto',
        }}
      />
    ),
  };

  return (
    <DashboardContextProvider>
      <SafeAreaView  style={styles.safeArea}>
        <StatusBar hidden={false} />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="AuthStack"
              component={AuthStack}
              options={{ headerShown: false, animation: 'simple_push' }}
            />
            <Stack.Screen
              name="AppStack"
              component={AppStack}
              options={{ headerShown: false, animation: 'simple_push' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast config={toastConfig} />
      </SafeAreaView>
    </DashboardContextProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
