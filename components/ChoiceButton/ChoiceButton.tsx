import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ImageSourcePropType,
  Image,
} from 'react-native';
import {FC} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  ReduceMotion,
} from 'react-native-reanimated';

interface Props {
  icon: ImageSourcePropType;
  iconSize: number;
  bgColor: string;
  radius: number;
  width: number;
  height: number;
  action: () => void;
  disabled?: boolean;
}

const ChoiceButton: FC<Props> = ({
  icon,
  bgColor,
  radius,
  width,
  height,
  action,
  iconSize,
  disabled = false,
}) => {
  const animatedScale = useSharedValue(1);

  const handlePressIn = () => {
    if (disabled) return;
    animatedScale.value = withTiming(0.9, {
      duration: 100,
      easing: Easing.inOut(Easing.back(0.8)),
      reduceMotion: ReduceMotion.System,
    });
  };

  const handlePressOut = () => {
    if (disabled) return;
    animatedScale.value = withTiming(1, {
      duration: 100,
      easing: Easing.inOut(Easing.back(0.8)),
      reduceMotion: ReduceMotion.System,
    });
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{scale: animatedScale.value}],
    };
  });

  const propsStyles = {
    backgroundColor: bgColor,
    width: width,
    height: height,
    radius: radius,
  };

  return (
    <Animated.View style={[styles.container, animatedStyles, propsStyles]}>
      <Pressable
        onPress={disabled ? () => {} : action}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={[styles.content]}>
        <Image
          source={icon}
          style={{
            width: iconSize,
            height: iconSize,
          }}
        />
      </Pressable>
      {disabled && <View style={styles.blurContainer}></View>}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  content: {
    height: 40,
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
  blurContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(37, 37, 37, 0.54)',
    borderRadius: 100,
  },
});

export default ChoiceButton;
