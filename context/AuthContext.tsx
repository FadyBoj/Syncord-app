import {View, StyleSheet, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, FC, useState, useEffect} from 'react';
import axios from 'axios';

interface Props {
  children: JSX.Element;
}

interface IContext {
  setIsLoading: React.Dispatch<
    React.SetStateAction<{
      value: boolean;
      fromNav: boolean;
    }>
  >;
  getToken: () => Promise<string | null>;
}

export const AuthContext = createContext<IContext | null>(null);

const AuthProvider: FC<Props> = ({children}) => {
  const [isLoading, setIsLoading] = useState({
    value: true,
    fromNav: false,
  });

  useEffect(() => {
    setTimeout(() => {
      setIsLoading({value: false, fromNav: false});
    }, 2000);
  }, [0]);

  useEffect(() => {
    if (isLoading.fromNav) {
      setTimeout(() => {
        setIsLoading({value: false, fromNav: false});
      }, 200);
    }
  }, [isLoading]);

  const getToken = async () => {
    const tokenValue = await AsyncStorage.getItem('token');
    if (tokenValue === null) return tokenValue;
    //Validating token
    try {
      await axios.get('http://syncord.somee.com/user/requests', {
        headers: {
          Authorization: `Bearer ${tokenValue}`,
        },
      });
      return tokenValue;
    } catch (error) {}
    return null;
  };

  return (
    <View style={styles.appContainer}>
      <AuthContext.Provider value={{setIsLoading, getToken}}>
        {children}
      </AuthContext.Provider>
      {isLoading.value && (
        <View style={styles.container}>
          <ActivityIndicator size={40} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#1c1d22',
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

export default AuthProvider;
