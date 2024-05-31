import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: screenWidth * 0.9,
    height: screenHeight,
    backgroundColor: '#111216',
    borderRightWidth: 3,
    borderRadius: 8,
    flex: 1,
    gap: 20,
    position:'relative'
  },
  logoContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,

  },
  logo: {
    width: 150,
    height: 43,
    objectFit: 'contain',
  },
  sidebarIcon: {
    width: 30,
    height: 30,
    objectFit: 'contain',
  },
  sidebarBtn: {
    transform: [{translateY: 2}],
  },
  navContainer: {
    flexDirection: 'column',
    gap: 10,
    backgroundColor: '#212129',
    width: '90%',
    minHeight: 200,
    borderRadius: 12,
    padding: 20,
    paddingLeft:10,
    paddingRight:10,
    justifyContent: 'space-between',
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1.25,
    shadowRadius: 3.84,
    elevation:10
  },
  sec1: {
    gap: 40,
    width: '100%',
    alignItems:"center"
  },
  sec2: {
    backgroundColor: '#212129',
    width: '90%',
    minHeight: 200,
    borderRadius: 12,
    padding: 20,
    justifyContent: 'space-between',
    shadowColor: 'black',
    shadowOffset: {
      width: 20,
      height: 2,
    },
    shadowOpacity: 1.25,
    shadowRadius: 3.84,
    elevation:10
    
  },
  profilePicContainer: {
    position: 'relative',
    width: 60,
  },
  profilePic: {
    width: 60,
    height: 60,
    objectFit: 'cover',
    borderRadius: 100,
  },
  previewInfo: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    gap: 13,
  },
  nameId: {
    flexDirection: 'column',
    gap: 3,
  },
  nameText: {
    fontFamily: 'Roboto',
    color: 'white',
    fontSize: 16,
  },
  idText: {
    fontFamily: 'Roboto',
    color: 'gray',
    fontSize: 12,
    width:'80%'
  },
  logEditContainer: {
    flexDirection: 'row',
    gap:20,
    justifyContent:'space-between'
  },
  imagePlaceHolder:{
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor:'#6441A5',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  pfpText:{
    fontFamily:'Roboto',
    color:'white',
    fontSize:20
  },
});

export default styles;
