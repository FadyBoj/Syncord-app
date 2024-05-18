import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  Easing,
  ReduceMotion
} from 'react-native-reanimated';
import React, {FC} from 'react';

interface Props {
  label: string;
  action: () => void;
  bgColor:string
}

const Index: FC<Props> = ({label,action,bgColor}) => {
  const scaleValue = useSharedValue(1);
  const animatedOpacity = useSharedValue(1);

  const handlePress = () => {
    scaleValue.value = withSpring(0.98);
    animatedOpacity.value = withTiming(0.8, {
      duration: 200,
      easing: Easing.inOut(Easing.back(0.8)),
      reduceMotion: ReduceMotion.System
    });
  };

  const handlePressOut = () => {
    scaleValue.value = withSpring(1);
    animatedOpacity.value = withTiming(1, {
        duration: 200,
        easing: Easing.inOut(Easing.back(0.8)),
        reduceMotion: ReduceMotion.System
      });
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <Pressable onPress={action} onPressIn={handlePress} onPressOut={handlePressOut}>
      <Animated.View
        style={{
          transform: [{scale: scaleValue}],
          opacity: animatedOpacity,
          backgroundColor:bgColor,
          width:0.88 * screenWidth,
          ...styles.container,
        }}>
        <Text style={styles.registerText}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 45,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerText: {
    fontSize: 14,
    color: 'white',
    fontFamily:'Roboto'

  },
});

export default Index;
