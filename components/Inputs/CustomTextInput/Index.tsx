import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
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
}) => {
  const screenWidth = Dimensions.get('window').width;

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setIsPasswordVisible(prev => !prev);

  return (
    <View style={styles.container}>
      {showLabel && <Text style={styles.label}>{label}</Text>}
      <TextInput
        placeholder={label}
        style={[
          {width: 0.9 * screenWidth, borderColor: isError ? '#ff3333' : '',borderWidth:isError ? 1 : 0},
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
      {helper && <Text style={styles.helperText}>{helper}</Text>}
      {isError && <Text style={styles.errorText}>{errorMsg}</Text>}
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
    backgroundColor: '#32323c',
    borderRadius: 4,
    height: 50,
    paddingLeft: 15,
  },
  label: {
    color: '#787b86',
  },
  helperText: {
    fontFamily: 'Roboto',
    fontSize: 12,
    transform: 'translateX(5px)',
  },
  eyeContainer: {
    position: 'absolute',
    right: 0,
    padding: 20,
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
});

export default Index;
