import {View, Text, TextInput, StyleSheet, Dimensions} from 'react-native';
import React, {FC} from 'react';

interface Props {
  label: string;
  value: string;
  changeFunction: (text: string, name: string) => void;
  showLabel?: boolean;
  name: string;
  helper?: string | null;
}

const Index: FC<Props> = ({
  label,
  value,
  changeFunction,
  showLabel = true,
  name,
  helper = null,
}) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      {showLabel && <Text style={styles.label}>{label}</Text>}
      <TextInput
        placeholder={label}
        style={{width: 0.9 * screenWidth, ...styles.input}}
        value={value}
        onChangeText={text => changeFunction(text, name)}
      />
      {
        helper &&
        <Text style={styles.helperText}>{helper}</Text>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 10,
  },
  input: {
    backgroundColor: '#32323c',
    borderRadius: 8,
    height: 50,
    paddingLeft: 15,
  },
  label: {
    color: '#787b86',
  },
  helperText:{
    fontFamily:'Roboto',
    fontSize:12,
    transform:'translateX(5px)'
  }
});

export default Index;
