import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageSourcePropType,
  TouchableHighlight,
} from 'react-native';
import {FC, useContext} from 'react';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthContext} from '../../context/AuthContext';

interface Props {
  name: string;
  image: ImageSourcePropType;
  navDestination: string;
  isActive: boolean;
  closeDrawer: () => void;
}

const NavItem: FC<Props> = ({
  name,
  image,
  navDestination,
  isActive,
  closeDrawer,
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const setIsLoading = useContext(AuthContext)?.setIsLoading;

  const handleNavigation = () => {
    closeDrawer();
    setTimeout(() => {
      if (setIsLoading) {
        setIsLoading({value: true, fromNav: true});
        navigation.navigate(navDestination);
      }
    }, 200);
  };

  return (
    <TouchableHighlight
      style={[
        styles.container,
        {backgroundColor: isActive ? '#323337' : '#1c1d22'},
      ]}
      underlayColor={'#323337'}
      activeOpacity={0.9}
      onPress={handleNavigation}>
      <>
        <Image source={image} style={styles.icon} />
        <Text style={styles.navTitle}>{name}</Text>
      </>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderRadius: 8,
    gap: 20,
    paddingLeft: 10,
  },
  navTitle: {
    fontFamily: 'Roboto',
    fontSize: 17,
  },
  icon: {
    width: 20,
    height: 20,
  },
});

export default NavItem;
