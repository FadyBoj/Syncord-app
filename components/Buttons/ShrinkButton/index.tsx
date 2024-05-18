import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  Easing,
  ReduceMotion,
} from 'react-native-reanimated';
import React, {FC} from 'react';

interface Props {
  label: string;
  action: () => void;
  bgColor: string;
  disabled?: boolean;
  disabledBg?: string;
  width?: number;
  isLoading?: boolean;
}

const screenWidth = Dimensions.get('window').width;

const Index: FC<Props> = ({
  label,
  action,
  bgColor,
  disabled = false,
  disabledBg,
  width = 0.88 * screenWidth,
  isLoading = false,
}) => {
  const scaleValue = useSharedValue(1);
  const animatedOpacity = useSharedValue(1);

  const handlePress = () => {
    scaleValue.value = withSpring(0.98);
    animatedOpacity.value = withTiming(0.8, {
      duration: 200,
      easing: Easing.inOut(Easing.back(0.8)),
      reduceMotion: ReduceMotion.System,
    });
  };

  const handlePressOut = () => {
    scaleValue.value = withSpring(1);
    animatedOpacity.value = withTiming(1, {
      duration: 200,
      easing: Easing.inOut(Easing.back(0.8)),
      reduceMotion: ReduceMotion.System,
    });
  };

  return (
    <Pressable
      onPress={disabled || isLoading ? () => {} : action}
      onPressIn={disabled || isLoading ? () => {} : handlePress}
      onPressOut={handlePressOut}>
      <Animated.View
        style={{
          transform: [{scale: scaleValue}],
          opacity: animatedOpacity,
          backgroundColor: disabled || isLoading ? disabledBg : bgColor,
          width: width,
          ...styles.container,
        }}>
        {isLoading ? (
          <ActivityIndicator size={30} />
        ) : (
          <Text
            style={{
              color: disabled || isLoading ? '#b0b4d0' : 'white',
              ...styles.registerText,
            }}>
            {label}
          </Text>
        )}
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
    fontFamily: 'Roboto',
  },
});

export default Index;
