import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {useContext, FC, useEffect, useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {AuthContext} from '../../context/AuthContext';

interface Props {
  onFailNav: string;
  children: JSX.Element;
  screen?: string;
}

const AuthLayout: FC<Props> = ({onFailNav, children, screen = null}) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [isLoading,setIsLoading] = useState(true);
  const getToken = useContext(AuthContext)?.getToken

  useEffect(() => {
    const handleGetToken = async() =>{
      let token = null
      if(getToken)
        token = await getToken();
      if(token === null)
        setIsLoading(false)
      else 
      navigation.navigate(onFailNav,{screen:screen})
    }
    handleGetToken()
  }, [0]);

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
