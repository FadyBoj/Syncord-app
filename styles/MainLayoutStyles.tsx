import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'black'
    },
    mainScreen:{
        width:'100%',
        height:'100%',
        position:'absolute'
    },
    loadingContainer:{
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#1c1d22',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    }
});

export default styles;