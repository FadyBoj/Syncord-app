import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        backgroundColor:'#1c1d22',
        paddingTop:40,
        gap:40
    },
    mainText:{
        fontFamily:'Roboto',
        color:'white',
        fontSize:25
    },
    inputContainer:{
        gap:10
    },
    confirmEmailText:{
        color:'#787b86',
        transform:'translateX(7px)',
        fontSize:12,
        fontFamily:'Roboto'
    }
});

export default styles;