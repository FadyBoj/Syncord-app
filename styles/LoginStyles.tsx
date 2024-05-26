import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1d22',
    alignItems: 'center',
    gap: 40,
    paddingLeft: 20,
    paddingRight: 20,
  },
  labelText: {
    color: 'white',
    fontFamily: 'Roboto',
    fontSize: 24,
  },
  labelInputContainer: {
    gap: 14,
  },
  btnsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleContainer: {
    width:'100%',
    alignItems:'center'
  },
  titleText:{
    fontFamily:'Roboto',
    color:'white',
    fontSize:24
  },
  sloganText:{
    fontFamily:'Roboto',
    color:'gray',
    fontSize:12
  },
  inptsContainer:{
    gap:20
  },
  forgetText:{
    color:'#1b98d4',
    fontSize:13,
    transform:[{translateX:5}]
  }
});

export default styles;
