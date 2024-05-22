import {View, Text, Dimensions} from 'react-native';
import styles from '../../styles/DrawerStyles';
import { FC } from 'react';



const Drawer:FC = ({}) => {
 
  const screenWidth = Dimensions.get('window').width;

  return (
    <View
      style={[styles.container]}>
      <Text>This is a Drawer</Text>
    </View>
  );
};

export default Drawer;
