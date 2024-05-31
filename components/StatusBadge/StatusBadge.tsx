import {View, Text, StyleSheet} from 'react-native';
import {FC} from 'react';

interface Props{
    status:string
    right?:number,
    bgColor?:string,
    size?:number
}

const StatusBadge:FC<Props> = ({right=0,bgColor="#2d2d35",size=13}) => {

  const dynamicStyles = {
    right:right,
    backgroundColor:bgColor,
  }

  const ballStyles=  {
    width:size,
    height:size
  }

  return (
    <View style={[styles.container,dynamicStyles]}>
        <View style={[styles.ball,ballStyles]}></View>
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
