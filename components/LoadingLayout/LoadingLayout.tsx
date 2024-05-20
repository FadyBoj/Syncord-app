import {View, Text, ActivityIndicator, StyleSheet} from 'react-native';
import {useContext, FC} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation, ParamListBase} from '@react-navigation/native';
import {AuthContext} from '../../context/AuthContext';

interface Props {
  onFailNav: string;
  children: JSX.Element;
}

const LoadingLayout: FC<Props> = ({onFailNav, children}) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const token = useContext(AuthContext);

  if (token === null) navigation.navigate(onFailNav);

  return !token ? (
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

export default LoadingLayout;
