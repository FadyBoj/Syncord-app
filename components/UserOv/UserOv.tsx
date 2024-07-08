import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {FC, useEffect, useState} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import {
  GestureDetector,
  Gesture,
  ScrollView,
} from 'react-native-gesture-handler';
import {IFriend} from '../../context/DashboardContext';

//Components
import ImagePlaceHolder from '../ImagePlaceHolder/ImagePlaceHolder';
import ShrinkBtn from '../Buttons/ShrinkButton';

//Assets
import editIcon from '../../assets/edit.png';
import chatIcon from '../../assets/friendChat.png';

//Utils
import getMonthYear from '../../utils/getMonthYear';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
const SWIPE_THRESHOLD = 1000; // suitable threshold for swipe velocity

interface Props {
  isOpen: boolean;
  closeUserOv: () => void;
  user: IFriend;
}

const UserOv: FC<Props> = ({isOpen, closeUserOv, user}) => {
  const animTranslate = useSharedValue(screenHeight * 0.84);
  const [rootDisplay, setRootDisplay] = useState<'none' | 'flex'>('flex');

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateY: animTranslate.value}],
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
      animTranslate.value = withSpring(screenHeight * 0.84, fastSpringConfig);
      setRootDisplay('none');
      return;
    } else {
      animTranslate.value = withSpring(0, fastSpringConfig);
      setRootDisplay('flex');
    }
  }, [isOpen]);

  const gesture = Gesture.Pan()
    .onBegin(() => {
      isPressed.value = true;
    })
    .onUpdate(e => {
      animTranslate.value = e.translationY > 0 ? e.translationY : 0;
    })
    .onEnd(e => {
      const isFastSwipe = e.velocityY > SWIPE_THRESHOLD;

      if (isFastSwipe || animTranslate.value > 240) {
        animTranslate.value = withSpring(screenHeight * 0.84, fastSpringConfig);
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
      transform: [{translateY: animTranslate.value}],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[styles.wrapper, animatedStyles, animatedMoveStyles]}>
        <View style={styles.mainContent}>
          <View style={styles.stick}></View>
          <View style={styles.container}>
            <View style={styles.mainContent2}>
              {/* Row 1 */}
              <View style={styles.row1}>
                <View style={styles.imageContainer}>
                  <ImagePlaceHolder
                    firstname={user.firstname}
                    lastname={user.lastname}
                    image={user.image}
                    size={80}
                    fontSize={30}
                  />
                </View>
              </View>
              <ScrollView style={{flexGrow: 1}}>
                {/* Row 2 */}
                <View style={{gap:10}}>
                  <View style={styles.row2}>
                    <View style={styles.nameContainer}>
                      <Text allowFontScaling={false} style={styles.firstName}>
                        {user.firstname}
                      </Text>
                      <Text allowFontScaling={false} style={styles.id}>
                        {user.userId}
                      </Text>
                      <Text allowFontScaling={false} style={styles.id}>
                        {user.email}
                      </Text>
                    </View>
                    <View style={styles.btnsContainer}>
                      <ShrinkBtn
                        label="Message"
                        action={() => {
                          console.log('Editing');
                        }}
                        bgColor="#5865f2"
                        width={140}
                        radius={12}
                        icon={chatIcon}
                        padding={0}
                      />
                    </View>
                  </View>
                  {/* Row3 */}
                  <View style={styles.row3}>
                    <Text allowFontScaling={false} style={styles.memberText}>
                      Syncord member since
                    </Text>
                    <Text allowFontScaling={false} style={styles.memberDate}>
                      {getMonthYear(user.createdAt.toString())}
                    </Text>
                  </View>
                </View>
              </ScrollView>
              {/* Row 4 */}
            </View>
          </View>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  gr: {
    width: screenWidth,
    height: screenHeight * 0.84,
    position: 'absolute',
    bottom: -30,
    zIndex: 200,
  },
  wrapper: {
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#151515',
    height: screenHeight * 0.84,
    paddingTop: 140,
    borderRadius: 20,
    position: 'absolute',
    bottom: -30,
    zIndex: 200,
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
    backgroundColor: '#212129',
    borderRadius: 20,
    height: '100%',
  },
  stick: {
    width: 60,
    height: 2,
    backgroundColor: '#4d4f5b',
    top: -135,
    borderRadius: 100,
  },
  container2: {
    width: screenWidth,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    gap: 80,
  },
  mainContent2: {
    width: screenWidth,
    height: '100%',
    paddingLeft: 10,
    paddingRight: 10,
    gap: 10,
  },
  row1: {
    position: 'relative',
    height: 30,
  },
  imageContainer: {
    position: 'absolute',
    top: -70,
    left: 0,
    backgroundColor: '#212129',
    borderRadius: 100,
    padding: 10,
  },
  row2: {
    backgroundColor: '#16151a',
    width: '100%',
    minHeight: 100,
    borderRadius: 15,
    padding: 20,
    borderWidth: 0.4,
    borderColor: '#2c2c34',
    gap: 25,
  },
  firstName: {
    fontSize: 20,
    color: '#e4e5e9',
    fontFamily: 'Roboto',
  },
  id: {
    fontSize: 10,
    color: '#76777c',
    fontFamily: 'Roboto',
  },
  nameContainer: {
    gap: 5,
  },
  btnsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  row3: {
    backgroundColor: '#16151a',
    width: '100%',
    minHeight: 70,
    borderRadius: 15,
    padding: 20,
    borderWidth: 0.4,
    borderColor: '#2c2c34',
    gap: 10,
  },
  memberText: {
    color: '#9597a1',
    fontFamily: 'Roboto',
    fontSize: 15,
  },
  memberDate: {
    color: '#c1c1c7',
    fontFamily: 'Roboto',
    fontSize: 13,
  },
});

export default UserOv;
