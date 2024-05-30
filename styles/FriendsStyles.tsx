import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container:{
        width:screenWidth,
        height:'100%',
        justifyContent:'flex-start',
        alignItems:'center',
        backgroundColor:'#111216',
        paddingTop:20
    },
    titleContainer:{
        justifyContent:'center',
        alignItems:'center'
    },
    titleText:{
        fontFamily:'Roboto',
        fontSize:18,
        color:'white'
    }

});

export default styles;