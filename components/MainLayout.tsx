import {View, Text, Dimensions} from 'react-native';
import {FC, useEffect} from 'react';
import styles from '../styles/MainLayoutStyles';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
//Components
import Drawer from './Drawer/Drawer';

interface Props {
  children: JSX.Element;
  closeDrawer: () => void;
  isDrawerOpen: boolean;
}

const MainLayout: FC<Props> = ({children, closeDrawer, isDrawerOpen}) => {
  const screenWidth = Dimensions.get('window').width;

  const mainScreenTransfromValue = useSharedValue(0);

  const mainScreenAnimatedStyle = useAnimatedStyle(() => {
    return {
      left: mainScreenTransfromValue.value,
    };
  });

  useEffect(() => {
    if (isDrawerOpen) {
      mainScreenTransfromValue.value = withTiming(screenWidth * 0.9,{duration:500});
    } else {
      mainScreenTransfromValue.value = withTiming(0,{duration:500});
    }
  });

  return (
    <View style={styles.container}>
      {/* The children refers to the main screen */}
      <Animated.View style={[styles.mainScreen, mainScreenAnimatedStyle]}>
        {children}
      </Animated.View>
      {isDrawerOpen && <Drawer />}
    </View>
  );
};

export default MainLayout;
