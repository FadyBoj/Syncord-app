import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {FC} from 'react';

const screenWidth = Dimensions.get('window').width;

interface Props {
  title: string;
  rightComponent?: () => JSX.Element;
  bgColor?: string;
}

const Header: FC<Props> = ({title, rightComponent, bgColor = '#111216'}) => {
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: bgColor ? bgColor : '#111216'},
      ]}>
      <Text style={styles.title}>{title}</Text>
      <View>{rightComponent && rightComponent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 10,
    height: 80,
  },
  title: {
    fontFamily: 'Roboto',
    color: 'white',
    fontSize: 20,
  },
});

export default Header;
