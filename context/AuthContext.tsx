import {View, StyleSheet, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, FC, useState, useEffect} from 'react';

interface Props {
  children: JSX.Element;
}

interface IContext {
  token: string | null;
  setIsLoading: React.Dispatch<
    React.SetStateAction<{
      value: boolean;
      fromNav: boolean;
    }>
  >;
}

export const AuthContext = createContext<IContext | null>(null);

const AuthProvider: FC<Props> = ({children}) => {
  const [token, setToken] = useState<string | null>('token v');
  const [isLoading, setIsLoading] = useState({
    value: true,
    fromNav: false,
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const tokenValue = await AsyncStorage.getItem('token');
        setToken(tokenValue);
        setTimeout(() => {
          setIsLoading({value: false, fromNav: false});
        }, 1000);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [0]);

  useEffect(() => {
    if (isLoading.fromNav) {
      setTimeout(() => {
        setIsLoading({value: false, fromNav: false});
      }, 200);
    }
  }, [isLoading]);

  return (
    <View style={styles.appContainer}>
      <AuthContext.Provider value={{token, setIsLoading}}>
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
