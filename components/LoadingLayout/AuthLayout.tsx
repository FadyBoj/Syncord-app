import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {useContext, FC, useEffect} from 'react';
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

  const token = useContext(AuthContext)?.token || null;

  useEffect(() => {
    if (token !== null) {
      if (!screen) {
        navigation.navigate(onFailNav);
      } else {
        navigation.navigate(onFailNav, {screen: screen});
      }
    }
  }, [0]);

  return token ? (
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
