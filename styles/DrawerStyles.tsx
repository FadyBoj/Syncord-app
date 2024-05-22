import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingLeft: 30,
    paddingRight: 30,
    alignItems: 'center',
    width: screenWidth * 0.9,
    height: screenHeight,
    backgroundColor: '#1c1d22',
    borderRightWidth: 3,
    borderRadius: 8,
    flex: 1,
    gap:40
  },
  logoContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    width: '100%',
    flexDirection: 'column',
    gap:10
  },
});

export default styles;
