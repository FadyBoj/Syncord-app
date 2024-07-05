import {View, Text, StyleSheet, Dimensions, Pressable} from 'react-native';
import Animated, {FadeIn,FadeOut} from 'react-native-reanimated';
import {FC} from 'react';

interface Props {
  children: JSX.Element;
  transparent?: boolean;
  closeModal: () => void;
}

const Backdrop: FC<Props> = ({children, transparent = false, closeModal}) => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  return (
    <Animated.View
      style={{
        backgroundColor: transparent ? '' : 'rgba(13, 13, 13, 0.737)',
        width: screenWidth,
        height: screenHeight,
        ...styles.container,
      }}
      entering={FadeIn.duration(100)}
      exiting={FadeOut.duration(300)}
      >
      <Pressable
        onPress={closeModal}
        style={styles.content}>
        {children}
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content:{
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent:'center'
  }
});

export default Backdrop;
