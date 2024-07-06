import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {FC} from 'react';
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

interface IUser {
  id: string;
  email: string;
  image: string | '';
  firstname: string;
  lastname: string;
}

interface Props {
  item: IUser;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setSearchState: React.Dispatch<
    React.SetStateAction<{
      skeletonVisible: boolean;
      searchHelperVisible: boolean;
    }>
  >;
}

const UserItem: FC<Props> = ({item, setEmail, setSearchState}) => {
  //Handle hover animation
  const animScale = useSharedValue(0.6);
  const animOpcity = useSharedValue(0);

  const handlePressIn = () => {
    animScale.value = withTiming(1, {
      duration: 200,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      reduceMotion: ReduceMotion.System,
    });
    animOpcity.value = withTiming(0.2, {
      duration: 200,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      reduceMotion: ReduceMotion.System,
    });
  };

  const handlePressOut = () => {
    animScale.value = withTiming(0.6, {
      duration: 200,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      reduceMotion: ReduceMotion.System,
    });
    animOpcity.value = withTiming(0, {
      duration: 200,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      reduceMotion: ReduceMotion.System,
    });
  };

  const handlePress = () => {
    setEmail(item.email);
    setSearchState({
      searchHelperVisible: false,
      skeletonVisible: false,
    });
  };
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{scaleX: animScale.value}],
      opacity: animOpcity.value,
    };
  });
  return (
    <TouchableWithoutFeedback
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={handlePress}>
      <View style={styles.userCont}>
        <Animated.View
          style={[styles.hoverStyles, animatedStyles]}></Animated.View>
        <View style={styles.userContent}>
          <View>
            <View style={styles.profilePicContainer}>
              {item && item.image ? (
                <Image
                  source={{uri: item?.image.replace('http', 'https')}}
                  style={styles.profilePic}
                />
              ) : (
                <View style={styles.imagePlaceHolder}>
                  <Text allowFontScaling={false} style={styles.pfpText}>
                    {item?.firstname[0].toLocaleUpperCase()}
                  </Text>
                  <Text allowFontScaling={false} style={styles.pfpText}>
                    {item?.lastname[0].toLocaleUpperCase()}
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View style={styles.col2}>
            <Text
              allowFontScaling={false}
              style={styles.name}>{`${item.firstname} ${item.lastname}`}</Text>
            <Text allowFontScaling={false} style={styles.emailText}>
              {item.email}
            </Text>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 90,
    left: 0,
    width: '100%',
    backgroundColor: '#26272e',
    borderRadius: 12,
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    gap: 27,
  },
  userCont: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  },
  col2: {
    flexDirection: 'column',
    gap: 5,
  },
  profilePicContainer: {
    position: 'relative',
    width: 40,
  },
  profilePic: {
    width: 40,
    height: 40,
    objectFit: 'cover',
    borderRadius: 100,
  },
  imagePlaceHolder: {
    width: 40,
    height: 40,
    borderRadius: 100,
    backgroundColor: '#6441A5',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pfpText: {
    fontFamily: 'Roboto',
    color: 'white',
    fontSize: 15,
  },
  name: {
    fontFamily: 'Roboto',
    color: 'white',
  },
  emailText: {
    fontFamily: 'Roboto',
    color: '#585a64',
  },
  hoverStyles: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'gray',
    opacity: 0.1,
    borderRadius: 20,
    zIndex: 30,
    left: 0,
    top: 0,
  },
  userContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 10,
    borderRadius: 8,
    position: 'relative',
    width: '100%',
    padding: 10,
  },
});

export default UserItem;
