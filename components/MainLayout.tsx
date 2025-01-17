import {
  View,
  Text,
  Dimensions,
  FlatList,
  ViewToken,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import React, {FC, useEffect, useRef, useState, memo} from 'react';
import styles from '../styles/MainLayoutStyles';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import DashboardContextProvider from '../context/DashboardContext';

//Components
import Drawer from './Drawer/Drawer';
import LogoutModal from './CustomModals/LogoutModal';
import Header from './Header/Header';

interface Props {
  children: JSX.Element;
  isDrawerOpen: boolean;
  activeScreen: string;
}

const MainLayout: FC<Props> = ({children, isDrawerOpen, activeScreen}) => {
  const screenWidth = Dimensions.get('window').width;
  const [isSwipeEnabled, setIsSwipeEnabled] = useState(false);
  const [listIndex, setListIndex] = useState<number | null>(1);
  const [isScrolling, setIsScrolling] = useState(false);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const flatListRef = useRef<FlatList | null>(null);
  const [firstRender, setFirstRender] = useState(true);
  const openLogoutModal = () => setLogoutModalVisible(true);
  const closeLogoutModal = () => setLogoutModalVisible(false);
  const openDrawer = () => {
    flatListRef.current?.scrollToIndex({
      index: 0,
    });
    setIsSwipeEnabled(true);
  };

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

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
    if (!isScrolling && listIndex === 1) setIsSwipeEnabled(false);
  }, [listIndex, isScrolling]);

  const closeDrawer = () => {
    flatListRef.current?.scrollToIndex({
      index: 1,
    });
    setIsSwipeEnabled(false);
  };

  //configure back behavior
  useEffect(() => {
    const backAction = () => {
      if (activeScreen === 'Chats') BackHandler.exitApp();
      else {
        navigation.goBack();
      }
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [0]);

  const handleFirstRender = () => {
    if (firstRender) {
      setFirstRender(false);
      setTimeout(() => {
        setIsLoading(false);
      }, 300);
    }
  };

  return (
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          data={[1, 2]}
          renderItem={({item}) =>
            item == 2 ? (
              <View style={styles.container}>
                <Header openDrawer={openDrawer} title={activeScreen} />
                {children}
              </View>
            ) : (
              <Drawer
                openModal={openLogoutModal}
                closeDrawer={closeDrawer}
                activeScreen={activeScreen}
              />
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
          onScroll={handleFirstRender}
        />
        {logoutModalVisible && <LogoutModal closeModal={closeLogoutModal} />}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={40} />
          </View>
        )}
      </View>
  );
};

export default memo(MainLayout);
