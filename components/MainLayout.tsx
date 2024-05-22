import {
  View,
  Text,
  Dimensions,
  FlatList,
  ViewToken,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from 'react-native';
import React, {FC, useEffect, useRef, useState, memo} from 'react';
import styles from '../styles/MainLayoutStyles';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  GestureHandlerRootView,
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
//Components
import Drawer from './Drawer/Drawer';

interface Props {
  children: JSX.Element;
  closeDrawer: () => void;
  isDrawerOpen: boolean;
}

const MainLayout: FC<Props> = ({children, closeDrawer, isDrawerOpen}) => {
  const screenWidth = Dimensions.get('window').width;
  const [isSwipeEnabled, setIsSwipeEnabled] = useState(false);
  const [listIndex, setListIndex] = useState<number | null>(1);
  const [isScrolling,setIsScrolling] = useState(false);
  const flatListRef = useRef<FlatList | null>(null);

  useEffect(() => {
    flatListRef.current?.scrollToIndex({
      index: 0,
    });
  }, [0]);

  useEffect(() => {
    flatListRef.current?.scrollToIndex({
      index: 0,
    });
    setIsSwipeEnabled(true);
  }, [isDrawerOpen]);

  const handleScroll = (info: {
    viewableItems: ViewToken<any>[];
    changed: ViewToken<any>[];
  }) => {
    const currentItem = info.viewableItems[0];
     setListIndex(currentItem.index);
  };

  useEffect(() => {
    if(!isScrolling && listIndex === 1)
      setIsSwipeEnabled(false)
  }, [listIndex,isScrolling]);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={[1, 2]}
        renderItem={({item}) =>
          item == 2 ? (
            <View style={styles.container}>{children}</View>
          ) : (
            <Drawer />
          )
        }
        horizontal
        pagingEnabled
        initialNumToRender={1}
        initialScrollIndex={1}
        getItemLayout={(data, index) => ({
          length: screenWidth,
          offset: screenWidth * 0.9 * index,
          index,
        })}
        scrollEnabled={isSwipeEnabled}
        viewabilityConfig={{itemVisiblePercentThreshold: 50}}
        onViewableItemsChanged={handleScroll}
        onScrollBeginDrag={() => setIsScrolling(true)}
        onScrollEndDrag={() => setIsScrolling(false)}
      />
    </View>
  );
};

export default memo(MainLayout);
