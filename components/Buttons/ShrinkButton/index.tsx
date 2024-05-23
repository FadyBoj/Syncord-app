import {
  View,
  Text,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Image,
  ImageSourcePropType
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
  radius: number;
  icon?:ImageSourcePropType
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
  icon
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
      onPress={disabled || isLoading ? () => {} : action}
      onPressIn={disabled || isLoading ? () => {} : handlePress}
      onPressOut={handlePressOut}>
      <Animated.View
        style={[
          {
            backgroundColor: disabled || isLoading ? disabledBg : bgColor,
            width: width,
            height: height,
            borderColor: borderColor,
            borderWidth: borderWidth,
            borderRadius: radius,
          },
          styles.container,
          btnAnimatedStyles,
        ]}>
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
        {
          icon && 
          <Image
          source={icon}
          style={styles.icon}
          />
        }
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection:'row',
    gap:10
  },
  registerText: {
    fontSize: 14,
    fontFamily: 'Roboto',
  },
  icon:{
    width:18,
    height:18,
    objectFit:'contain',
    transform:[{translateY:2}]
  }
});

export default Index;
