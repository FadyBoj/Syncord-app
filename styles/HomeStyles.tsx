import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container:{
        width:screenWidth,
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#111216',
        gap:80
    },
    btn:{
        padding:15,
        backgroundColor:'cyan',
        borderRadius:8
    },
    ball:{
        backgroundColor:'cyan',
        width:100,
        height:100,
        borderRadius:100
    }
});

export default styles;