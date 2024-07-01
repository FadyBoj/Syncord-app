import {StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    gap: 80,
    paddingTop: 140,
  },
  mainContent: {
    flexGrow: 1,
    width: screenWidth,
    backgroundColor: '#1c1d22',
    paddingLeft: 20,
    paddingRight: 20,
  },
  row1: {
    position: 'relative',
    height: 120,
  },
  imageContainer: {
    position: 'absolute',
    top: -70,
    left: -10,
    backgroundColor: '#1c1d22',
    borderRadius: 100,
    padding: 12,
  },
  row2: {
    backgroundColor: '#27272f',
    width: '100%',
    minHeight: 100,
    borderRadius: 15,
    padding: 20,
    borderWidth:2,
    borderColor:'#2c2c34'
  },
  firstName: {
    fontSize: 28,
    color: '#e4e5e9',
    fontFamily: 'Roboto',
  },
  id: {
    fontSize: 13,
    color: '#76777c',
    fontFamily: 'Roboto',
  },
  nameContainer: {
    gap: 5,
  },
  btnsContainer: {
    flexDirection:'row',
    gap:10
  },
});
export default styles;
