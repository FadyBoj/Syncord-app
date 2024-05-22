import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container:{
       justifyContent:'center',
       alignItems:'center',
       width:screenWidth * 0.9,
       height:screenHeight,
       backgroundColor:'cyan',
       borderRadius:8,
       flex:1
    }
});

export default styles;