import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from '../../styles/DrawerStyles';
import {FC, useId} from 'react';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import navigationData from './navigationData';

//Components
import NavItem from './NavItem';
import StatusBadge from '../StatusBadge/StatusBadge';

//Assets
import Logo from '../../assets/Logo2.png';
import sidebarIcon from '../../assets/sidebar.png';
import profileIcon from '../../assets/profile.jpg';

interface Props {
  closeDrawer: () => void;
  activeScreen: string;
}

const Drawer: FC<Props> = ({closeDrawer, activeScreen}) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  return (
    <View style={[styles.container]}>
      <View style={styles.sec1}>
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
      {/* Section 2 */}
      <View style={styles.sec2}>
        <View style={styles.previewInfo}>
          <View style={styles.profilePicContainer}>
            <Image source={profileIcon} style={styles.profilePic} />
            <StatusBadge status="online" />
          </View>
          <View style={styles.nameId}>
            <View>
              <Text style={styles.nameText}>Tony Soprano</Text>
            </View>
            <View>
              <Text style={styles.idText}>13-324aDSDW-23443</Text>
            </View>
          </View>
        </View>
        <View></View>
      </View>
    </View>
  );
};

export default Drawer;
