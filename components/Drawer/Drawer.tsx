import {View, Text, Dimensions} from 'react-native';
import styles from '../../styles/DrawerStyles';
import Animated, {
  SlideInLeft,
  SlideInRight,
  SlideOutLeft,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { FC } from 'react';

interface Props{
gestureStyles : object
}

const Drawer:FC<Props> = ({gestureStyles}) => {
 

  return (
    <Animated.View
      entering={SlideInLeft.duration(300)}
      exiting={SlideOutLeft.duration(300)}
      style={[styles.container,gestureStyles]}>
      <Text>This is a Drawer</Text>
    </Animated.View>
  );
};

export default Drawer;
