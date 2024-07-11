import {View, Text, StyleSheet} from 'react-native';
import {FC} from 'react';

interface Props {
  bgColor: string;
  length: number;
}

const Badge: FC<Props> = ({bgColor, length}) => {
  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <Text allowFontScaling={false} style={styles.num}>
        {length}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 51,
    borderRadius: 100,
    transform: [{translateX: 25}, {translateY: -5}],
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 27,
    height: 20,
  },
  num: {
    color: 'white',
    fontFamily: 'Roboto',
  },
});

export default Badge;
