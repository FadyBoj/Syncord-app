import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {FC, memo} from 'react';
import FastImage from 'react-native-fast-image';
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
//Assets
import chatIcon from '../../assets/friendChat.png';

//Components
import StatusBadge from '../StatusBadge/StatusBadge';

interface IFriend {
  friendShipId:string
  userId: string;
  email: string;
  firstname: string;
  lastname: string;
  isOnline: boolean;
  image: string;
}
interface Props {
  friend: IFriend;
  length: number;
  index: number;
  status: string;
}

const Friend: FC<Props> = ({friend, length, index, status}) => {

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();


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

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{scaleX: animScale.value}],
      opacity: animOpcity.value,
    };
  });

  // id: string;
  // userId: string;
  // email: string;
  // firstname: string;
  // lastname: string;
  // isOnline: boolean;
  // image: string;

  const handleNavigation = () =>{
    navigation.navigate('singleChat',{
     friend:friend
    })
  }

  return (
    <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <View
        style={[
          styles.container,
          {
            borderTopRightRadius: index === 0 ? 20 : 0,
            borderTopLeftRadius: index === 0 ? 20 : 0,
            borderBottomRightRadius: index === length - 1 ? 20 : 0,
            borderBottomLeftRadius: index === length - 1 ? 20 : 0,
          },
        ]}>
        <View style={styles.sec1}>
          <View style={styles.profilePicContainer}>
            {friend && friend.image ? (
              <Image
                source={{
                  uri: friend?.image.replace('http', 'https'),
                }}
                style={styles.profilePic}
              />
            ) : (
              <View style={styles.imagePlaceHolder}>
                <Text style={styles.pfpText}>
                  {friend?.firstname[0].toLocaleUpperCase()}
                </Text>
                <Text style={styles.pfpText}>
                  {friend?.lastname[0].toLocaleUpperCase()}
                </Text>
              </View>
            )}
            <StatusBadge
              status="online"
              right={13}
              bgColor="#23232a"
              size={11}
              ballBgColor={
                status.toLocaleLowerCase() === 'online' ? 'green' : 'gray'
              }
            />
          </View>
          <View>
            <Text
              style={
                styles.friendName
              }>{`${friend.firstname} ${friend.lastname}`}</Text>
          </View>
        </View>
        {/* Section 2  */}
        <TouchableOpacity onPress={handleNavigation} style={styles.chatIconContainer}>
          <Image source={chatIcon} style={styles.chatIcon} />
        </TouchableOpacity>
        {index !== length - 1 && <View style={styles.space}></View>}
      </View>
      <Animated.View
        style={[styles.hoverStyles, animatedStyles]}></Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    paddingLeft: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#2f2f39',
    position: 'relative',
    justifyContent: 'space-between',
    backgroundColor: '#23232a',
  },
  profilePicContainer: {
    position: 'relative',
    width: 60,
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
  sec1: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 0,
  },
  friendName: {
    fontFamily: 'Roboto',
    color: '#e4e5e9',
    fontSize: 14,
  },
  space: {
    position: 'absolute',
    backgroundColor: '#2f2f39',
    bottom: 0,
    width: '100%',
    height: 1,
    transformOrigin: 'center',
    transform: [{scaleX: 0.5}],
  },
  chatIcon: {
    width: 22,
    height: 22,
    objectFit: 'contain',
  },
  hoverStyles: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'gray',
    opacity: 0.3,
    borderRadius: 20,
    zIndex: 30,
  },
  chatIconContainer: {
    padding:19
  },
});

export default memo(Friend);
