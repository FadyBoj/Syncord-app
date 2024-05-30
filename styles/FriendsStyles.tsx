import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#111216',
    paddingTop: 40,
    paddingRight: 20,
    paddingLeft: 20,
    gap: 30,
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: 'Roboto',
    fontSize: 18,
    color: 'white',
  },
  addFriendContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  addFriendBtn: {},
  addFriendIcon: {
    width: 20,
    height: 20,
  },
  sec1: {
    width: '100%',
    gap: 20,
    alignItems: 'flex-end',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  searchIconContainer: {},
  searchIcon: {
    width: 30,
    height: 30,
    objectFit: 'contain',
  },
  sec2: {
    width: '100%',
    gap: 40,
  },
  filtersContainer: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    justifyContent: 'flex-start',
  },
  friendsListContainer: {},
});

export default styles;
