import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';

//Assets
import arrow from '../../assets/arrow.png';

interface Props {
  bgColor?: string;
  backAction: () => void;
  title?: string;
}

const NavHeader: FC<Props> = ({bgColor = '#1c1d22', backAction, title=null}) => {
  return (
    <View style={{backgroundColor: bgColor, ...styles.container}}>
      <TouchableOpacity onPress={backAction} style={styles.arrowContainer}>
        <Image style={styles.arrow} source={arrow} />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        {title && <Text allowFontScaling={false} style={styles.title}>{title}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 25,
    paddingBottom: 25,
    minHeight:70
  },
  arrow: {
    width: 30,
    height: 30,
  },
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Roboto',
    color: 'white',
    fontSize: 15,
  },
  arrowContainer: {
    position: 'absolute',
    left: 10,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingLeft:10,
    paddingRight:10,
    paddingTop:10,
    paddingBottom:10

  },
});

export default NavHeader;
