import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#1c1d22',
        borderLeftWidth:1,
        borderRadius:8,
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