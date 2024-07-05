import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {FC, useEffect, useContext} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  ReduceMotion,
} from 'react-native-reanimated';
import {DashboardContext} from '../../context/DashboardContext';

interface Props {
  isFocused: boolean;
  onPress: () => void;
  options: any;
  onLongPress: () => void;
  label: string;
}

//Assets
import tabChat from '../../assets/tabChat.png';
import friendsIcon from '../../assets/Friends.png';
import notificationsIcon from '../../assets/notification.png';

const TabButton: FC<Props> = ({
  isFocused,
  onPress,
  options,
  onLongPress,
  label,
}) => {
  //Start

  const animatedScale = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{scaleX: animatedScale.value}],
    };
  });

  useEffect(() => {
    if (isFocused) {
      animatedScale.value = withTiming(1, {
        duration: 200,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        reduceMotion: ReduceMotion.System,
      });
    } else {
      animatedScale.value = withTiming(0, {
        duration: 0,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        reduceMotion: ReduceMotion.System,
      });
    }
  }, [isFocused]);

  const user = useContext(DashboardContext)?.user;

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? {selected: true} : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      testID={options.tabBarTestID}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.barContainer}>
      <View style={styles.iconCotainer}>
        {label.toLocaleLowerCase() === 'you' ? (
          <View>
              <View style={styles.profilePicContainer}>
                {user?.image && user.image.replace('http','https') ? (
                  <Image
                    source={{uri: user?.image}}
                    style={styles.profilePic}
                  />
                ) : (
                  <View style={styles.imagePlaceHolder}>
                    <Text style={styles.pfpText}>
                      {user?.firstname[0].toLocaleUpperCase()}
                    </Text>
                    <Text style={styles.pfpText}>
                      {user?.lastname[0].toLocaleUpperCase()}
                    </Text>
                  </View>
                )}
              </View>
          </View>
        ) : label.toLocaleLowerCase() === 'messages' ? (
          <Image
            source={tabChat}
            style={[styles.icon, {tintColor: isFocused ? 'white' : 'gray'}]}
          />
        ) : label.toLocaleLowerCase() === 'friends' ? (
          <Image
            source={friendsIcon}
            style={[styles.icon, {tintColor: isFocused ? 'white' : 'gray'}]}
          />
        ) : (
          <Image
            source={notificationsIcon}
            style={[styles.icon, {tintColor: isFocused ? 'white' : 'gray'}]}
          />
        )}
      </View>
      <Text style={[styles.btnText, {color: isFocused ? 'white' : 'gray'}]}>
        {label}
      </Text>
      {/* Animation */}
      {isFocused && label.toLocaleLowerCase() !== 'you' && (
        <Animated.View
          style={[styles.scalable, animatedStyles]}></Animated.View>
      )}
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    position: 'relative',
  },
  barContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,

    width: '25%',
  },
  icon: {
    width: 20,
    height: 20,
    zIndex: 20,
  },
  btnText: {
    fontSize: 11,
    fontFamily: 'Roboto',
  },
  scalable: {
    position: 'absolute',
    backgroundColor: 'gray',
    opacity: 0.5,
    width: 50,
    height: 30,
    borderRadius: 100,
    top: -4,
    zIndex: 10,
  },
  pfp: {
    width: 30,
    height: 30,
    borderRadius: 100,
    position: 'relative',
    transform: [{translateY: -4}],
  },
  iconCotainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
  },
  profilePicContainer: {
    position: 'relative',
    width: 30,
    transform: [{translateY: -4}],
  },
  profilePic: {
    width: 30,
    height: 30,
    objectFit: 'cover',
    borderRadius: 100,
  },
  imagePlaceHolder: {
    width: 30,
    height: 30,
    borderRadius: 100,
    backgroundColor: '#6441A5',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pfpText: {
    fontFamily: 'Roboto',
    color: 'white',
    fontSize: 10,
  },
});

export default TabButton;
