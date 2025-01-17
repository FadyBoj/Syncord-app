import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {FC} from 'react';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

interface Props {
  close?: () => void;
  spinner?: boolean;
}

const SingleBackDrop: FC<Props> = ({close, spinner = false}) => {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.container}>
      <TouchableWithoutFeedback onPress={close} style={styles.content}>
        <View
          style={{
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {spinner && <ActivityIndicator size={50} />}
        </View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: screenHeight,
    position: 'absolute',
    backgroundColor: 'rgba(13, 13, 13, 0.737)',
    top: 0,
    left: 0,
    zIndex: 100,
  },
  content: {
    width: '100%',
    height: '100%',
    backgroundColor: 'red',
  },
});

export default SingleBackDrop;
