import {View, Text, Dimensions} from 'react-native';
import styles from '../../styles/DrawerStyles';
import Animated, {
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  useAnimatedStyle,
} from 'react-native-reanimated';

const Drawer = () => {
  const screenWidth = Dimensions.get('window').width;

  const drawerAnimatedStyles = useAnimatedStyle(() => {
    return {};
  });

  return (
    <Animated.View
      entering={SlideInLeft.duration(500)}
      exiting={SlideOutLeft.duration(500)}
      style={[styles.container]}>
      <Text>This is a Drawer</Text>
    </Animated.View>
  );
};

export default Drawer;
