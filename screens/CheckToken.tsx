import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {useContext, useEffect} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Utils
import isTokenExpired from '../utils/isTokenExpired';
import {DashboardContext} from '../context/DashboardContext';

const CheckToken = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const startApp = useContext(DashboardContext)?.getMainDashboard;

  useEffect(() => {
    AsyncStorage.getItem('token').then(token => {
      if (!token || isTokenExpired(token)) {
        navigation.navigate('AuthStack', {screen: 'Main'});
        return;
      }
      if (startApp) {
        startApp().then(() => {
          navigation.navigate('AppStack', {screen: 'Chats'});
        });
      }
    });
  }, [0]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size={40} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#111216',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  appContainer: {
    flex: 1,
    position: 'relative',
    height: '100%',
    width: '100%',
    backgroundColor: 'cyan',
  },
});

export default CheckToken;
