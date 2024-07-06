import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import React, {FC, useState} from 'react';

//Assets
import eyeIcon from '../../../assets/eye.png';
import closedEyeIcon from '../../../assets/closedEye.png';

interface Props {
  label: string;
  value: string;
  changeFunction: (text: string, name: string) => void;
  showLabel?: boolean;
  name: string;
  helper?: string | null;
  isPassword?: boolean;
  isError?: boolean;
  errorMsg?: string;
  radius?: number;
  bgColor?: string;
  icon?: ImageSourcePropType;
}

const Index: FC<Props> = ({
  label,
  value,
  changeFunction,
  showLabel = true,
  name,
  helper = null,
  isPassword = false,
  isError = false,
  errorMsg = false,
  radius = 4,
  bgColor = '#32323c',
  icon = null,
}) => {
  const screenWidth = Dimensions.get('window').width;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setIsPasswordVisible(prev => !prev);

  return (
    <View style={styles.container}>
      {showLabel && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputEyeContainer}>
        <TextInput
          allowFontScaling={false}
          placeholder={label}
          placeholderTextColor={'gray'}
          style={[
            {
              width: 0.9 * screenWidth,
              borderColor: isError ? '#ff3333' : '',
              borderWidth: isError ? 1 : 0,
              borderRadius: radius,
              backgroundColor: bgColor,
              paddingLeft: icon ? 50 : 15,
            },
            styles.input,
          ]}
          value={value}
          onChangeText={text => changeFunction(text, name)}
          secureTextEntry={isPassword && !isPasswordVisible}
        />
        {isPassword && (
          <TouchableOpacity
            style={styles.eyeContainer}
            onPress={togglePasswordVisibility}>
            {!isPasswordVisible ? (
              <Image source={eyeIcon} style={styles.eye} />
            ) : (
              <Image source={closedEyeIcon} style={styles.eye} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {helper && <Text allowFontScaling={false} style={styles.helperText}>{helper}</Text>}
      {isError && <Text allowFontScaling={false} style={styles.errorText}>{errorMsg}</Text>}
      {icon && (
        <View style={styles.iconContainer}>
          <Image source={icon} style={styles.icon} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 10,
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    height: 50,
    color: 'white',
  },
  label: {
    color: '#787b86',
  },
  helperText: {
    fontFamily: 'Roboto',
    fontSize: 12,
    transform: 'translateX(5px)',
    color: 'white',
  },
  inputEyeContainer: {
    justifyContent: 'center',
  },
  eyeContainer: {
    position: 'absolute',
    right: 0,
    padding: 13,
  },
  eye: {
    width: 23,
    height: 23,
    objectFit: 'contain',
  },
  errorText: {
    color: '#ff3333',
    fontSize: 12,
  },
  iconContainer: {
    position: 'absolute',
    left: 15,
    pointerEvents: 'none',
  },
  icon: {
    width: 17,
    height: 17,
  },
});

export default Index;
