import {View, Text, StyleSheet, Pressable} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  ReduceMotion,
} from 'react-native-reanimated';
import {FC} from 'react';

interface Props {
  name: string;
  isActive: boolean;
  handleFilterChange: (name: string) => void;
}

const FilterBtn: FC<Props> = ({name, isActive, handleFilterChange}) => {
  const animatedScale = useSharedValue(1);

  const handlePressIn = () => {
    animatedScale.value = withTiming(0.9,{
        duration: 100,
        easing: Easing.inOut(Easing.back(0.8)),
        reduceMotion: ReduceMotion.System,
      });
  };

  const handlePressOut = () => {
    animatedScale.value = withTiming(1,{
        duration: 100,
        easing: Easing.inOut(Easing.back(0.8)),
        reduceMotion: ReduceMotion.System,
      });
  };

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{scale: animatedScale.value}],
      backgroundColor:isActive ? '#22BB33' : '#27272f'
    };
  });

  return (
    <Animated.View style={[styles.container,animatedStyles]}>
      <Pressable
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
        onPress={() => handleFilterChange(name)}
        style={styles.content}>
        <Text style={styles.text}>{name}</Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
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
  text:{
    color:'white'
  }
});

export default FilterBtn;
