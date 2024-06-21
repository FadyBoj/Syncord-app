import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {useContext, FC, useEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {AuthContext} from '../../context/AuthContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  onFailNav: string;
  children: JSX.Element;
  screen?: string;
}

const AuthLayout: FC<Props> = ({onFailNav, children, screen = null}) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [isLoading, setIsLoading] = useState(true);
  const getToken = useContext(AuthContext)?.getToken;

    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) setIsLoading(false);
        const res = await axios.get(
          'https://syncord.runasp.net/user/requests',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        navigation.navigate(onFailNav, {screen: screen});
      } catch (error) {
        setIsLoading(false);
      }
    };
    checkAuth();

  return isLoading ? (
    <View style={styles.constainer}>
      <ActivityIndicator size={40} />
    </View>
  ) : (
    <>{children}</>
  );
};

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: '#1c1d22',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AuthLayout;
