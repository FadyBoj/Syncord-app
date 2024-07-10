import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Image,
  ImageSourcePropType,
} from 'react-native';
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  Easing,
  ReduceMotion,
  useAnimatedStyle,
} from 'react-native-reanimated';
import React, {FC} from 'react';

interface Props {
  label: string;
  action: () => void;
  bgColor: string;
  disabled?: boolean;
  disabledBg?: string;
  width?: number;
  height?: number;
  isLoading?: boolean;
  borderColor?: string;
  borderWidth?: number;
  color?: string;
  radius?: number;
  icon?: ImageSourcePropType;
  fit?: boolean;
  padding?: number;
  paddingLeft?: number;
  paddingRight?: number;
  iconMove?: number;
  tintColor?: string;
  fullWidth?: boolean;
}

const screenWidth = Dimensions.get('window').width;

const Index: FC<Props> = ({
  label,
  action,
  bgColor,
  disabled = false,
  disabledBg,
  width = 0.88 * screenWidth,
  height = 45,
  isLoading = false,
  borderColor = '',
  borderWidth = 0,
  radius = 4,
  color = 'white',
  icon,
  fit = false,
  padding = 0,
  paddingLeft = 0,
  paddingRight = 0,
  iconMove = 0,
  tintColor = 'white',
  fullWidth = false,
}) => {
  const scaleValue = useSharedValue(1);
  const animatedOpacity = useSharedValue(1);

  const handlePress = () => {
    scaleValue.value = withTiming(0.97, {
      duration: 100,
      easing: Easing.inOut(Easing.back(0.8)),
      reduceMotion: ReduceMotion.System,
    });
    animatedOpacity.value = withTiming(0.8, {
      duration: 0.1,
      easing: Easing.inOut(Easing.back(0.8)),
      reduceMotion: ReduceMotion.System,
    });
  };

  const handlePressOut = () => {
    scaleValue.value = withTiming(1, {
      duration: 100,
      easing: Easing.inOut(Easing.back(0.8)),
      reduceMotion: ReduceMotion.System,
    });
    animatedOpacity.value = withTiming(1, {
      duration: 0.1,
      easing: Easing.inOut(Easing.back(0.8)),
      reduceMotion: ReduceMotion.System,
    });
  };

  const btnAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{scale: scaleValue.value}],
      opacity: animatedOpacity.value,
    };
  });

  return (
    <Pressable
      style={{width: fullWidth ? '100%' : 'auto'}}
      onPress={disabled || isLoading ? () => {} : action}
      onPressIn={disabled || isLoading ? () => {} : handlePress}
      onPressOut={handlePressOut}>
      <Animated.View
        style={[
          {
            backgroundColor: disabled || isLoading ? disabledBg : bgColor,
            width: fullWidth ? '100%' : fit ? 'auto' : width,
            height: height,
            borderColor: borderColor,
            borderWidth: borderWidth,
            borderRadius: radius,
            padding: padding,
            paddingLeft: paddingLeft,
            paddingRight: paddingRight,
          },
          styles.container,
          btnAnimatedStyles,
        ]}>
        {icon && (
          <Image
            source={icon}
            style={[
              styles.icon,
              {transform: [{translateY: iconMove}], tintColor: tintColor},
            ]}
          />
        )}
        {isLoading ? (
          <ActivityIndicator size={30} />
        ) : (
          <Text
            allowFontScaling={false}
            style={{
              color: disabled || isLoading ? '#b0b4d0' : color,
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
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  registerText: {
    fontSize: 14,
    fontFamily: 'Roboto',
  },
  icon: {
    width: 18,
    height: 18,
    objectFit: 'contain',
  },
});

export default Index;
