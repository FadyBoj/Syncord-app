import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import {FC} from 'react';
import FastImage from 'react-native-fast-image';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
//Assets
import backArrowIcon from '../../assets/back-arrow.png';

const screenWidth = Dimensions.get('window').width;

interface Props {
  friendName?: string;
}

const SingleChatHeader: FC<Props> = ({friendName}) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const handleGoBack = () => {
    navigation.goBack()
  };
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{friendName}</Text>
      <TouchableOpacity onPress={handleGoBack} style={styles.arrowContainer}>
        <Image style={styles.arrowIcon} source={backArrowIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: screenWidth,
    height: 80,
    backgroundColor: '#111216',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderBottomWidth:1,
    borderColor:'#22222a'
  },
  name: {
    fontFamily: 'Roboto',
    color: 'white',
    fontSize: 20,
  },
  arrowContainer: {
    position: 'absolute',
    left: 10,
    padding: 18,
    paddingRight: 28,
  },
  arrowIcon: {
    tintColor: 'gray',
    width: 20,
    height: 20,
  },
});

export default SingleChatHeader;
