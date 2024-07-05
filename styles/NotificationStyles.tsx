import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexGrow:1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 50,
    backgroundColor: '#111216',
    paddingBottom: 30,
    paddingLeft:20,
    paddingRight:20,
    paddingTop:20
  },
  emptyIcon:{
    width:300,
    height:300
  },
  iconConttainer:{
    width:'100%',
    alignItems:'center',
    paddingTop:89
  },
  emptyText:{
    color:'#b1b2b7',
    fontSize:17,
    textAlign:'center',
    fontFamily:'Roboto'
  }
});
export default styles;
