import {StyleSheet, BackHandler} from 'react-native';
import {FC, useEffect, useId} from 'react';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {IUserOv} from '../../navigators/AppNavigator';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

//Components
import TabButton from './TabButton';

interface Props {
  state?: any;
  descriptors?: any;
  navigation?: any;
  addFriendModal: boolean;
  userOv: IUserOv;
  closeUserOv: () => void;
}

const MyTabBar: FC<Props> = ({
  state,
  descriptors,
  navigation,
  addFriendModal,
  userOv,
  closeUserOv,
}) => {
  const animTransform = useSharedValue(0);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      bottom: animTransform.value,
    };
  });

  useEffect(() => {
    if ((addFriendModal || userOv.visible) && state.index === 0) {
      animTransform.value = withTiming(-80);
    } else {
      animTransform.value = withTiming(0);
    }
  }, [addFriendModal, state, userOv]);

  //Handling back button behavior
  useEffect(() => {
    const backAction = () => {
      if (userOv.visible) {
          closeUserOv();
          return true
      }
      if (state.index === 0 && !userOv.visible) {
        BackHandler.exitApp();
      }
      else {
        navigation.goBack()
      }

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [state, userOv.visible]);

  return (
    <Animated.View style={[styles.container, animatedStyles]}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabButton
            key={useId()}
            isFocused={isFocused}
            onPress={onPress}
            options={options}
            onLongPress={onLongPress}
            label={label}
          />
        );
      })}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2d2d35',
    height: 70,
    borderTopWidth: 2,
    borderColor: '#33333d',
    position: 'absolute',
    bottom: 100,
  },
  barContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
  },
  icon: {
    width: 20,
    height: 20,
    objectFit: 'contain',
  },
});

export default MyTabBar;
