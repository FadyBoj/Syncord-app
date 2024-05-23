import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {useContext, FC, useState, useEffect} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {AuthContext} from '../../context/AuthContext';

interface Props {
  onFailNav: string;
  children: JSX.Element;
}

const LoadingLayout: FC<Props> = ({onFailNav, children}) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const [isLoading, setIsLoading] = useState(true);
  const token = useContext(AuthContext)?.token;

  useEffect(() =>{
    if (token === null) navigation.navigate('AuthStack',{screen:'Main'});

  },[token])

  useEffect(() => {
    setIsLoading(false);
  }, [0]);

  return (
    <View style={styles.mainContainer}>
      {isLoading && (
        <View style={styles.constainer}>
          <ActivityIndicator size={40} />
        </View>
      )}
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  constainer: {
    flex: 1,
    backgroundColor: '#1c1d22',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 1000,
  },
  mainContainer: {
    flex: 1,
    height: '100%',
    position: 'relative',
  },
});

export default LoadingLayout;
