import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from '../../styles/DrawerStyles';
import {FC, useId} from 'react';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import navigationData from './navigationData';

//Components
import NavItem from './NavItem';

//Assets
import Logo from '../../assets/Logo2.png';
import sidebarIcon from '../../assets/sidebar.png';

interface Props {
  closeDrawer: () => void;
  activeScreen: string;
}

const Drawer: FC<Props> = ({closeDrawer, activeScreen}) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <View style={[styles.container]}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={Logo} />
        <TouchableOpacity style={styles.sidebarBtn} onPress={closeDrawer}>
          <Image style={styles.sidebarIcon} source={sidebarIcon} />
        </TouchableOpacity>
      </View>

      {/* Row 2 */}
      <View style={styles.navContainer}>
        {navigationData.map((item, index) => {
          return (
            <NavItem
              key={useId()}
              name={item.name}
              image={item.image}
              navDestination={item.navDestination}
              isActive={activeScreen === item.name}
              closeDrawer={closeDrawer}
            />
          );
        })}
      </View>
    </View>
  );
};

export default Drawer;
