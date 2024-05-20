import {View, StyleSheet, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createContext, FC, useState, useEffect} from 'react';
import {
  useNavigation,
  ParamListBase,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

interface Props {
  children: JSX.Element;
}

type contextType = string | null;

export const AuthContext = createContext<contextType>(null);

const AuthProvider: FC<Props> = ({children}) => {
  const [token, setToken] = useState<string | null>('token v');
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  useEffect(() => {
    const getData = async () => {
      try {
        const tokenValue = await AsyncStorage.getItem('token');
        setToken(tokenValue);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [0]);

  return !isLoading ? (
    <AuthContext.Provider value={token}>{children}</AuthContext.Provider>
  ) : (
    <View style={styles.constainer}>
      <ActivityIndicator size={40} />
    </View>
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

export default AuthProvider;
