import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import styles from '../../styles/DrawerStyles';
import {FC, useId, useContext} from 'react';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import navigationData from './navigationData';
import AsyncStorage from '@react-native-async-storage/async-storage';

//Components
import NavItem from './NavItem';
import StatusBadge from '../StatusBadge/StatusBadge';
import ShrinkButton from '../Buttons/ShrinkButton';

//Assets
import Logo from '../../assets/Logo2.png';
import sidebarIcon from '../../assets/sidebar.png';
import profileIcon from '../../assets/profile.jpg';
import logoutIcon from '../../assets/logout.png';
import {AuthContext} from '../../context/AuthContext';

interface Props {
  closeDrawer: () => void;
  activeScreen: string;
  openModal: () => void;
}

const Drawer: FC<Props> = ({closeDrawer, activeScreen, openModal}) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const testAction = () => {};

  // const handleLogout = async() =>{
  //   await AsyncStorage.removeItem()
  // }

  const user = useContext(AuthContext)?.user;

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
            {user && user.image  ? (
              <Image source={{uri: user?.image}} style={styles.profilePic} />
            ) : (
              <View style={styles.imagePlaceHolder}>
                <Text style={styles.pfpText}>
                  {user?.firstname[0].toLocaleUpperCase()}
                </Text>
                <Text style={styles.pfpText}>
                  {user?.lastname[0].toLocaleUpperCase()}
                </Text>
              </View>
            )}

            <StatusBadge status="online" />
          </View>
          <View style={styles.nameId}>
            <View>
              <Text
                style={
                  styles.nameText
                }>{`${user?.firstname} ${user?.lastname}`}</Text>
            </View>
            <View>
              <Text numberOfLines={1} style={styles.idText}>
                {user?.id}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.logEditContainer}>
          <ShrinkButton
            label="Edit profile"
            action={testAction}
            bgColor="#2d2d35"
            width={120}
            height={50}
            radius={8}
            borderColor="gray"
            borderWidth={1}
          />
          <ShrinkButton
            label="Log out"
            action={openModal}
            bgColor="#2d2d35"
            width={120}
            height={50}
            borderWidth={1}
            borderColor="gray"
            radius={8}
            icon={logoutIcon}
          />
        </View>
      </View>
    </View>
  );
};

export default Drawer;
