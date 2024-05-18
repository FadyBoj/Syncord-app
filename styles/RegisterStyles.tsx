import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:"flex-start",
        alignItems:'center',
        paddingTop:90,
        gap:50,
        backgroundColor:'#1c1d22'
    },
    hero:{
        width:'99%',
        height:300,
        objectFit:'cover',
        transform:'translateX(10px)'

    }
    ,
    logo:{
        width:200,
        height:30,
        objectFit:'contain',
    },
    sec1:{
        minHeight:1,
        alignItems:'center',
        width:'100%',
        flexDirection:'column',
    },
    sec2:{
        gap:20
    },
    mainText:{
        fontSize:30,
        textAlign:'center',
        color:'white',
        fontFamily:'Roboto'

    },
    secText:{
        color:'#595d62',
        fontSize:13,
        textAlign:'center',
        fontFamily:'Roboto'

    },
    authBtnsContainer:{
        gap:20,
        
    }
});
export default styles;