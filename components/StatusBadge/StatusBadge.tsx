import {View, Text, StyleSheet} from 'react-native';
import {FC} from 'react';

interface Props{
    status:string
}

const StatusBadge:FC<Props> = () => {
  return (
    <View style={styles.container}>
        <View style={styles.ball}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    bottom:0,
    right:0,
    backgroundColor:'#2d2d35',
    padding:3,
    borderRadius:100
  },
  ball:{
    backgroundColor:'green',
    width:13,
    height:13,
    borderRadius:100,
  }
});

export default StatusBadge;
