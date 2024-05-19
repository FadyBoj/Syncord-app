import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1d22',
    paddingTop: 40,
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
    width:'100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default styles;
