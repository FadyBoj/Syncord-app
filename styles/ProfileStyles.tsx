import {StyleSheet, Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
  wrapper: {
    height:screenHeight,
    position:'relative'
  },
  container: {
    width: screenWidth,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    gap: 80,
    paddingTop: 100,
  },
  mainContent: {
    flexGrow: 1,
    width: screenWidth,
    backgroundColor: '#1c1d22',
    paddingLeft: 20,
    paddingRight: 20,
    gap: 15,
  },
  row1: {
    position: 'relative',
    height: 60,
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
    borderWidth: 2,
    borderColor: '#2c2c34',
    gap: 25,
  },
  firstName: {
    fontSize: 20,
    color: '#e4e5e9',
    fontFamily: 'Roboto',
  },
  id: {
    fontSize: 10,
    color: '#76777c',
    fontFamily: 'Roboto',
  },
  nameContainer: {
    gap: 5,
  },
  btnsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  row3: {
    backgroundColor: '#27272f',
    width: '100%',
    minHeight: 70,
    borderRadius: 15,
    padding: 20,
    borderWidth: 2,
    borderColor: '#2c2c34',
    gap: 10,
  },
  memberText: {
    color: '#9597a1',
    fontFamily: 'Roboto',
    fontSize: 15,
  },
  memberDate: {
    color: '#c1c1c7',
    fontFamily: 'Roboto',
    fontSize: 13,
  },
});
export default styles;
