import {StyleSheet, Dimensions} from 'react-native';

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111216',
    paddingBottom:80
  },
  messagesList: {
    paddingTop: 20,
  },

  msgInput: {
    backgroundColor: '#26262e',
    width: '80%',
    borderRadius: 100,
    paddingLeft: 20,
    height: 45,
    color: 'white',
  },
  sendIcon: {
    width: 20,
    height: 20,
    transform: [{translateX: 2}],
  },
  sendIconContainer: {
    width: '15%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    padding: 10,
  },
  loadingContainer: {
    backgroundColor: '#111216',
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    position:'relative',
    flex:1,
    zIndex:100
  },
  chatInputContainer: {
    width: '100%',
    backgroundColor: '#111216',
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    position:'absolute',
    bottom:0
  },
});

export default styles;
