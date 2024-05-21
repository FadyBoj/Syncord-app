import {View, Text, Dimensions} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import styles from '../styles/MainLayoutStyles';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {GestureHandlerRootView,Gesture,GestureDetector} from 'react-native-gesture-handler';
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
      mainScreenTransfromValue.value = withTiming(screenWidth * 0.9, {
        duration: 300,
      });
    } else {
      mainScreenTransfromValue.value = withTiming(0, {duration: 300});
    }
  });

  //Configure drawer gesture
  const isPressed = useSharedValue(false);
  const offset = useSharedValue({x:0})
  const startPosition = useSharedValue({x:0,y:0})


  const drawerGestureStyles = useAnimatedStyle(() =>{
    return {
        transform:[
            {translateX:offset.value.x}
        ]
    }
  })

  const mainScreenGestureStyles= useAnimatedStyle(() =>{
    return {
        
    }
  })

  const drawerGesture = Gesture.Pan()
  .onBegin(() =>{
    isPressed.value = true
  })
  .onUpdate((e) =>{
    offset.value = {
        x:e.translationX < 0 ? e.translationX : 0,
    }
  })
  .onEnd(() =>{
    isPressed.value = false
    offset.value = {
        x:withTiming(0),
    }
  })

  const mainScreen = React.cloneElement(children,{gestureStyles:mainScreenGestureStyles});
  
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        {/* The children refers to the main screen */}
        <Animated.View style={[styles.mainScreen, mainScreenAnimatedStyle]}>
          {mainScreen}
        </Animated.View>
        {isDrawerOpen && 
        <GestureDetector gesture={drawerGesture}>
            <Drawer gestureStyles={drawerGestureStyles} />
        </GestureDetector>
        }
      </View>
    </GestureHandlerRootView>
  );
};

export default MainLayout;
