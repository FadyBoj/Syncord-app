import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {FC,useId} from 'react';

//Components
import TabButton from './TabButton';

interface Props {
  state?: any;
  descriptors?: any;
  navigation?: any;
}

const MyTabBar: FC<Props> = ({state, descriptors, navigation}) => {

  return (
    <View style={styles.container}>
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TabButton
          key={useId()}
            isFocused={isFocused}
            onPress={onPress}
            options={options}
            onLongPress={onLongPress}
            label={label}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'#2d2d35',
    height:70,
    borderTopWidth:2,
    borderColor:'#33333d'
  },
  barContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
  },
  icon: {
    width: 20,
    height: 20,
    objectFit: 'contain',
  },
});

export default MyTabBar;
