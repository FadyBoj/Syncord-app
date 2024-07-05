import {StyleSheet} from 'react-native';
import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flexGrow:1,
    width: screenWidth,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#111216',
    paddingRight: 20,
    paddingLeft: 20,
    gap: 30,
    paddingBottom:30
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
    paddingTop:10
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
  friendsListContainer: {
  },
  emptyContainer:{
    width:'100%',
    alignItems:'center',
  },
  emptyImage:{
    width:350,
    height:350,
    objectFit:'contain'
  },emptyText:{
    color:'#b1b2b7',
    fontSize:17,
    textAlign:'center',
    fontFamily:'Roboto'
  },
  wrapper:{
    position:'relative',
  }
});

export default styles;
