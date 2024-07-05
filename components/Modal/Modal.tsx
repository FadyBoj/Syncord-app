import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import React, {FC} from 'react';
import Animated, {FadeInUp, FadeOutDown, ZoomIn} from 'react-native-reanimated';

//Components
import Backdrop from '../Backdrop/Backdrop';

//Assets
import closeIcon from '../../assets/close.png';

interface Props {
  closeModal: () => void;
  children: JSX.Element;
  height?: number;
  width?: number;
  showClose?: boolean;
}

const Modal: FC<Props> = ({
  closeModal,
  children,
  height = 300,
  width,
  showClose = true,
}) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <Backdrop closeModal={closeModal}>
      <Pressable onPress={e => e.stopPropagation()}>
        <Animated.View
          entering={FadeInUp.springify().stiffness(200).damping(18)}
          exiting={FadeOutDown.duration(300)}
          style={{
            width: width ? width : 0.8 * screenWidth,
            height: height,
            paddingTop:showClose ? 60 : 0,
            ...styles.container,
          }}>
          <>
            {/* Close button */}
            {showClose && (
              <TouchableOpacity
                onPress={closeModal}
                style={styles.closeContainer}>
                <Image style={styles.closeIcon} source={closeIcon} />
              </TouchableOpacity>
            )}

            {children}
          </>
        </Animated.View>
      </Pressable>
    </Backdrop>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    backgroundColor: '#1c1d22',
    alignItems: 'center',
    zIndex: 30,
    position: 'relative',
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  closeContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 10,
  },
});

export default Modal;
