import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { FC, useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  GestureDetector,
  Gesture,
} from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const SWIPE_THRESHOLD = 1000; // Define a suitable threshold for swipe velocity

interface Props {
  isOpen: boolean;
  closeUserOv: () => void;
}

const UserOv: FC<Props> = ({ isOpen, closeUserOv }) => {
  const animTranslate = useSharedValue(screenHeight * 0.7);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: animTranslate.value }],
    };
  });
  const fastSpringConfig = {
    damping: 23,
    stiffness: 230,
    mass: 1,
    velocity: 0,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  };

  const isPressed = useSharedValue(false);

  useEffect(() => {
    if (!isOpen) {
      animTranslate.value = withSpring(screenHeight * 0.7, fastSpringConfig);
      return;
    } else {
      animTranslate.value = withSpring(0, fastSpringConfig);
    }
  }, [isOpen]);

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate((e) => {
      animTranslate.value = e.translationY > 0 ? e.translationY : 0;
    })
    .onEnd((e) => {
      const isFastSwipe = e.velocityY > SWIPE_THRESHOLD;
      console.log(e.velocityY)

      if (isFastSwipe || animTranslate.value > 240) {
        animTranslate.value = withSpring(screenHeight * 0.7, fastSpringConfig);
        runOnJS(closeUserOv)();
      } else {
        animTranslate.value = withSpring(0, fastSpringConfig);
      }
    })
    .onFinalize(() => {
      isPressed.value = false;
    });

  const animatedMoveStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: animTranslate.value }],
    };
  });

  return (
    <GestureHandlerRootView style={[styles.gr, { bottom: isOpen ? -30 : -screenHeight * 0.7 }]}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.wrapper, animatedStyles, animatedMoveStyles]}>
          <View style={styles.mainContent}>
            <View style={styles.stick}></View>
            <View style={styles.container}></View>
          </View>
        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  gr: {
    width: screenWidth,
    height: screenHeight * 0.7,
    position: 'absolute',
    bottom: -30,
    pointerEvents: 'none',
  },
  wrapper: {
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'black',
    height: screenHeight * 0.7,
    paddingTop: 100,
    borderRadius: 20,
  },
  mainContent: {
    width: '100%',
    height: '100%',
    position: 'relative',
    alignItems: 'center',
  },
  container: {
    width: '100%',
    zIndex: 200,
    backgroundColor: '#27272f',
    borderRadius: 20,
    height: '100%',
  },
  stick: {
    width: 60,
    height: 5,
    backgroundColor: '#4d4f5b',
    top: -95,
    borderRadius: 100,
  },
});

export default UserOv;
