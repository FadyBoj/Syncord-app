import {View, Text, StyleSheet, Dimensions} from 'react-native';
import React from 'react';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const SingleBackDrop = () => {
  return (
    <View>
      <Text>SingleBackDrop</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  cotainer: {
    width: screenWidth,
    height: screenHeight,
    position: 'absolute',
    backgroundColor: 'rgba(13, 13, 13, 0.737)',
    top: 0,
    left: 0,
  },
});

export default SingleBackDrop;
